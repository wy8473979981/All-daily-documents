$ns("mx.editors");

$import("mx.editors.ComboEditor");
$import("mx.editors.ListEditor");
$import("mx.types.HashMap");

/**
 * 智能查询控件。
 * 
 * @example
 * <code language="JavaScript">
 * 	 var auto = new mx.editors.AutoCompleteEditor({
 * 		url: "~/country"
 *   });
 * </code>
 */
mx.editors.AutoCompleteEditor = function()
{
	var me = $extend(mx.editors.ComboEditor);
	var base = {};
	
	/**
	 * @default true
	 */
	me.allowEditing = true;
	
	/**
	 *设置和获取一个字符串，该值表示服务地址。 服务返回的数据格式为： {successful: true, resultValue: [{ text: "中国", value: "China"}, {text: "美国", value: "America"}]}
	 *必须要设置{@link data}和{@link url}两个属性中的其中一个
	 */
	me.url = null;
	
	/**
	 * 设置和获取一个 JSON 对象，该值表示服务请求的自定义参数。
	 */
	me.params = null;
	
	/**
	 * 设置和获取一个数组对象，该值表示本地数据源。
	 * 必须要设置{@link data}和{@link url}两个属性中的其中一个
	 */
	me.data = null;
	
	/**
	 * 设置和获取一个 Boolean 值，该值表示是否选中下拉列表的第一个值。
	 * @default true.
	 */
	me.selectFirst = true;
	
	/**
	 * @ignore
	 * 设置和获取一个 Boolean 值，该值表示控件是否支持多选。
	 * @default false
	 */
	me.multiSelect = false;
	
	/**
	 * 设置和获取显示字段。
	 * @default text
	 */
	me.displayMember = 'text';
	
	/**
	 * 设置和获取值字段。
	 * @default value
	 */
	me.valueMember = 'value';
	
	/**
	 * @ignore
	 */
	me.delay = 10;
	
	/**
	 * 设置和获取一个值，该值表示数据集 {@link data} 大小的最大值。该属性作为服务请求的参数 limit 的值。
	 * @default 100
	 */
	me.maxItems = 100;
	
	/**
	 * 设置和获取一个值，该值表示在触发 autoComplete 前用户至少需要输入的字符数。
	 */
	me.minChars = 1;
	
	/**
	 * 设置和获取一个 Boolean 值，该值表示是否必须匹配。
	 * @default false
	 */
	me.mustMatch = false;
	
	/**
	 * 设置和获取一个 Boolean 值，该值表示在字符串比较时是否要在字符串内部匹配。该属性只对本地数据源有效。
	 * @default false
	 */
	me.matchContains = false;
	
	/**
	 * 设置和获取一个 Boolean 值，该值表示是否使用本地缓存查询结果。
	 * @default true
	 */
	me.matchSubset = true;
	
	/**
	 * 设置和获取一个 Boolean 值，该值表示是否开启大小写敏感。
	 * @default true
	 */
	me.matchCase = true;
	
	/**
	 * 设置和获取一个缓存控件 {@link mx.editors.AutoCompleteEditor.Cache}。
	 */
	me.cache = null;
	
	/**
	 * 设置和获取一个数值，该值表示缓存控件最大缓存记录数。
	 */
	me.cacheLength = 10;
	
	/**
	 * @ignore
	 * 设置和获取当多选状态的分隔符。
	 * @default ","
	 */
	me.multipleSeparator = ",";
	
	/**
	 * 设置和获取一个数值，该值表示下拉列表的最小高度。
	 */
	me.dropDownMinHeight = 24;
	
	/**
	 * 设置和获取一个数值，该值表示下拉列表的最大高度。
	 */
	me.dropDownMaxHeight = 200;
	
	/**
	 * 设置和获取一个 Boolean 值，该值表示是否开启自动匹配高亮显示。
	 * @default false
	 */
	me.heightLightMatch = false;
		
	var _client = null;
	
	//查询列表
	var _resultList = null;
	
	var _KEY = {
			UP: 38,
			DOWN: 40,
			DEL: 46,
			TAB: 9,
			RETURN: 13,
			ESC: 27,
			COMMA: 188,
			PAGEUP: 33,
			PAGEDOWN: 34,
			BACKSPACE: 8,
			SHIFT: 16
	};
	
	var _lastKeyPressCode = null;
	
	var _timeout;
	
	var _previousText = null;
	
	base.init = me.init;
	me.init = function()
	{
		base.init();
		_init();
	};
	
	base.setHint = me.setHint;
	me.setHint = function(p_hint)
	{
		if ($notEmpty(p_hint) && !me.readOnly &&　me.allowEditing)
		{
			base.setHint(p_hint);
		}
	};
	
    base.setAllowEditing = me.setAllowEditing;
    me.setAllowEditing = function(p_allowEditing)
    {
    	base.setAllowEditing(p_allowEditing);
    	if (p_allowEditing && !me.readOnly)
    	{
    		me.$input.on('keydown', _$input_keydown);
			
			if ($notEmpty(me.$hintInput)) 
			{
				me.$hintInput.focus(_hintInput_focus);
			}
    	}
    	else
    	{
    		me.$input.off('keydown', _$input_keydown);
			me.$e.off("click", me._dropDownButton_click);
			if ($notEmpty(me.$hintInput)) 
			{
				me.$hintInput.off("focus", _hintInput_focus);
			}
    	}
    };
    
    /**
	 * 根据输入的值请求匹配的数据。
	 */
	me.search = function()
	{
		$.each(_trimWords(me.$input.val()), function(i, value) 
		{
			_request(value, _findValue, _findValue);
		});
	};
	
	/**
	 * 设置本地数据源。
	 * @param p_data 一个数组。
	 */
	me.appendItems = function(p_data)
	{
		if (me.data)
		{
			me.data.addAll(p_data);
		}
		else
		{
			me.data = p_data;
		}
		
		me.cache.populate();
	};
	
	 base.reset = me.reset;
	    
     /**
      * 重置编辑器。
      * @param [p_triggerEvent=false] 指定是否要触发 {@link onchanged} 事件。
      */
     me.reset = function(p_triggerEvent)
     {
         base.reset(p_triggerEvent);
         if (me.cache)
         {
        	 me.cache.clear();
         }
         
         if (me.dropDownControl)
         {
        	 me.dropDownControl.clearItems();
         }
     };
    
	/**
	 *@ignore 
	 */
	me._initDropDownControl = function()
	{
		if (me.dropDownControl == null)
		{
			var options = {visible: false};
			options.displayMember = me.displayMember;
			options.valueMember = me.valueMember;
			options.selectFirst = me.selectFirst;
			_resultList = new AutoCompleteResultList(options);
			_resultList.on("itemclick", _resultList_itemclick);
			me.dropDownControl = _resultList; 
		}
	};
	
	/**
	 *@ignore 
	 */
	me._afterDropDown = function()
    {	
		me.$input.focus();
		me.dropDownControl.$e.scrollTop(0);
		$(document).on('click',docClick);
    };
    
    base.hideDropDown = me.hideDropDown;
    me.hideDropDown = function(p_speed)
    {
    	base.hideDropDown(p_speed);
    	$(document).off('click',docClick);
    	if (me.heightLightMatch)
    	{
    		if (_resultList && _resultList.items && _resultList.items.length > 0)
        	{
        		$(_resultList.items).each(function(){
        			this.$e.find("span#text").html(this.text);
        		});
        	}
    	}
    }
	
    /**
	 *@ignore 
	 */
	base._resetDropDownControl = me._resetDropDownControl;
    me._resetDropDownControl = function()
    {
       base._resetDropDownControl();
       var height = _resultList.items.length * 18 + 2;
       if (height < me.dropDownMinHeight)
       {
           height = me.dropDownMinHeight;
       }
       else if (height > me.dropDownMaxHeight)
       {
           height = me.dropDownMaxHeight;
       }
	    _resultList.resizeTo(me.$e.width(), height);
    };
    
    /**
     *@ignore 
     */
    me._toggleInputStatus = function()
    {
    	if ($isEmpty(me.$hintInput) || !me.enabled || me.readOnly)
    		return;
    	if ($isEmpty(me.value) && $notEmpty(me.hint) && !me.droppedDown && $isEmpty(me.$input.val()))
        {
            me.$hintInput.val(me.hint);
            me.$input.hide();
            me.$hintInput.show();
        }
        else
        {
        	me.$input.show();
            me.$hintInput.hide();
        }
    	//清除编辑框时，hint显示value置空。
    	if ($isEmpty(me.$input.val()) && !$isEmpty(me.value) && $notEmpty(me.hint) && !me.droppedDown)
    	{
    		me.$hintInput.val(me.hint);
            me.$input.hide();
            me.$hintInput.show();
            me.setValue("");
    	}
    };
    
    /**
     *@ignore 
     */
//    me._input_blur = function()
//    {
//    	_selectCurrent();
//    };
    
    function docClick(e)
   	{
   		if(e.target.id == "dropDownButton"){
   			return;
   		}
   		_selectCurrent();	
   	}
    
	function _init()
	{
		_client = new mx.rpc.RESTClient({
			baseUrl: $isString(me.url) ? me.url : null 
		});
		
		me.$input.off('change', me._input_change);
		
		me.cache = new AutoCompleteCache({
			owner: me
		});
		if (! $isString(me.url) && $notEmpty(me.data))
		{
			me.cache.populate();
		}
		me.setReadOnly(me.readOnly);
	}
	
	function _hintInput_focus(e)
	{
		 me.$input.show();
         me.$hintInput.hide();
         me.$input.focus();
	}
	
	function _$input_keydown(e)
	{
		_lastKeyPressCode = e.keyCode;
		switch (e.keyCode)
		{
			case _KEY.DOWN:
				e.preventDefault();
				if (_resultList.visible)
				{
					_resultList.moveNext();
				}
				else
				{
					_onChange(true);
				}
				break;
			case _KEY.UP:
				e.preventDefault();
				if (_resultList.visible)
				{
					_resultList.moveRrev();
				}
				else
				{
					_onChange(true);
				}
				break;
			case _KEY.PAGEDOWN:
				e.preventDefault();
				if (_resultList.visible)
				{
					_resultList.pageDown();
				}
				else
				{
					_onChange(true);
				}
				break;
			case _KEY.PAGEUP:
				if (_resultList.visible)
				{
					_resultList.pageUp();
				}
				else
				{
					_onChange(true);
				}
				break
			case _KEY.SHIFT:
				break;
			case me.multiSelect && me.multipleSeparator == "," && _KEY.COMMA :
			case _KEY.TAB:
			case _KEY.RETURN:
				e.preventDefault();
				_selectCurrent();
				break;
			case _KEY.ESC:
				me.hideDropDown(me.speed);
				break;
			default: 
				clearTimeout(_timeout);
				_timeout = setTimeout(_onChange, me.delay);
				break;
		}
	}
	
	function _findValue(p_term, p_data)
	{
		var result = null;
		if( p_data && p_data.length ) 
		{
			for (var i = 0; i < p_data.length; i++) {
				if( p_data[i][me.displayMember].toLowerCase() == p_term.toLowerCase() ) 
				{
					result = p_data[i];
					break;
				}
			}
		}
		if( !result ) 
		{
			me.setValue(null, true);
		}
		else
		{
			me.setValue(result[me.valueMember], result[me.displayMember], true);
		}
	}
	
	function _selectCurrent()
	{
		if ($notEmpty(_resultList.selection))
		{
			var newValue = _resultList.selection.value;
			var newText = _resultList.getItemByValue(newValue).text;
			me.setValue(newValue, newText, true);
		}
		_hideResult(true);
	}
	
	function _resultList_itemclick(e)
	{
		_selectCurrent();
	}
	
	//去空格处理
	function _trimWords(p_value) 
	{
		if (!p_value)
			return [""];
		if (!me.multiSelect)
			return [$.trim(p_value)];
		return $.map(p_value.split(me.multipleSeparator), function(word) {
			return $.trim(p_value).length ? $.trim(word) : null;
		});
	}
	
	//获取光标所在的Term
	function _lastWord(p_value) 
	{
		if ( !me.multiSelect )
			return p_value;
		
		var words = _trimWords(p_value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = me.$input.selection().start;
		if (cursorAt == p_value.length) 
		{
			words = _trimWords(p_value)
		}
		else 
		{
			words = _trimWords(p_value.replace(p_value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	function _onChange(p_skipPrevCheck)
	{
		if( _lastKeyPressCode == _KEY.DEL ) 
		{
			me.hideDropDown(me.speed);
			return;
		}
		var currentText = me.$input.val();
		if (!p_skipPrevCheck && currentText == _previousText && me.dropDownControl.visible == true)
			return;
		
		_previousText = currentText;
		var text = _lastWord(currentText);	
		
		if (text.length >= me.minChars) 
		{
			if (!me.matchCase)
			{
				text = text.toLowerCase();
			}
			_request(text, _receiveData, _hideResult);
		}
	}
	
	function _receiveData(p_term, p_data) 
	{
		if ($isArray(p_data) && p_data.length > 0)
		{
			me.markError(false);
			_resultList.setItems(p_data);
			if (me.heightLightMatch)
			{
				if (_resultList.items && _resultList.items.length > 0)
				{
					$(_resultList.items).each(function(){
			    		if (me.$input.val() != null || me.$input.val() != "")
			    		{
			    			var text = this.text;
			    			var val = me.$input.val();
			    			if (text.indexOf(val) >= 0)
			    			{
			    				var tmp = [];
			    				tmp = text.split(val);
			    				var p = '';
			    				this.$e.find("span#text").html('');
			    				for(var i = 0; i< tmp.length;i++){
			    					if (i == tmp.length - 1)
			    					{
			    						p = p + tmp[i];
			    					}else{
			    						p = p + tmp[i] + "<font class='heightLight'>"+ val + "</font>";
			    					}
			    					
			    				}
			    				this.$e.find("span#text").html(p);
			    			}
			    		}
					});
				}
			}
			me.dropDown(me.speed);	
		}
		else
		{
			_hideResult();
		}
	}
	
	function _hideResult(p_isMatch)
	{
		clearTimeout(_timeout);
		me.hideDropDown(me.speed);
		if (me.mustMatch)
		{
			me.search();
		}
		else
		{
			me.markError(!p_isMatch, mx.msg("NOT_MATCHED"));
		}
	}
		
	function _request(p_term, p_successCallBack, p_failureCallBack)
	{
		if (!me.matchCase)
			p_term = p_term.toLowerCase();
		var data = me.cache.load(p_term);
		if (data && data.length) 
		{
			p_successCallBack(p_term, data);
		}
		else if ($isString(me.url))
		{
			_client.get(
				null, 
				$.extend({'term': p_term, limit: me.maxItems}, me.params),
				function(p_context)
				{
					if (p_context.successful)
					{
						var resultValue = p_context.resultValue;
						p_successCallBack(p_term, p_context.resultValue);
					}
					else
					{
						mx.indicate(p_context.type, p_context.resultHint);
					}
				}
			);
		}
		else
		{
			me.value = null;
			_resultList.clearItems();
			p_failureCallBack();
		}
	};
	
	
	/**
	 * 缓存控件。该控件用于缓存查询结果。
	 */
	function AutoCompleteCache()
	{
		var self = $extend(MXComponent);
		var base = {};
		
		self.owner = null;
		
		self.data = {};
		
		self.length = 0;
		
		base.init = self.init;
		self.init = function()
		{
			base.init();
		}
		
		self.load = function(p_term)
		{
			if (!self.owner.cacheLength || !self.length)
				return null;
			if( !self.owner.url && self.owner.matchContains )
			{
				var csub = [];
				for( var k in self.data )
				{
					if( k.length > 0 )
					{
						var c = self.data[k];
						$.each(c, function(i, x) 
						{
							if (self._matchSubset(x[self.owner.displayMember], p_term)) 
						    {
								csub.push(x);
							}
						});
					}
				}
				return csub;
			}
			else if (self.data[p_term])
			{
				return self.data[p_term];
			} 
			else if (self.owner.matchSubset) 
			{
				for (var i = p_term.length - 1; i >= self.owner.minChars - 1; i--) {
					var c = self.data[p_term.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (self._matchSubset(x[self.owner.displayMember], p_term)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		};
		
		self.clear = function()
		{
			self.data = {};
			self.length = 0;
		};
		
		self.add = function(q, p_value)
		{
			if (self.length > self.owner.cacheLength)
			{
				self.clear();
			}
			if (!self.data[q]){ 
				self.length++;
			}
			self.data[q] = p_value;
		}
		
		self._matchSubset = function(s, sub) 
		{
			if (!self.owner.matchCase) 
				s = s.toLowerCase();
			var i = s.indexOf(sub);
			
			if (i == -1) return false;
			return i == 0 || self.owner.matchContains;
		};
		
		/**
		 * 本地化数据
		 */
		self.populate = function()
		{
			var data = self.owner.data;
			var nullData = 0;
			var stMatchSets = {};	
			stMatchSets[""] = [];
			var length = data.length;
			for ( var i = 0; i < length; i++ ) 
			{
				var rawValue = data[i];
				var row = {};
				if ($isString(rawValue))
				{
					row[self.owner.valueMember] = rawValue;
					row[self.owner.displayMember] = rawValue;
				}
				else if ($.isPlainObject(rawValue))
				{
					row = $clone(rawValue);
				}
				
				var firstChar = self.owner.matchCase ? row[self.owner.displayMember].charAt(0): row[self.owner.displayMember].charAt(0).toLowerCase();
				
				if( !stMatchSets[firstChar] ) 
					stMatchSets[firstChar] = [];
				
				stMatchSets[firstChar].push(row);

				if ( nullData++ < self.owner.maxItems) {
					stMatchSets[""].push(row);
				}
			};

			$.each(stMatchSets, function(i, value) {
				self.add(i, value);
			});
		};

		self.endOfClass(arguments);
		return self;
	};


	/**
	 * 查询列表。
	 */
	function AutoCompleteResultList()
	{
		var self = $extend(mx.editors.ListEditor);
		var base = {}
		
		self.selectFirst = true;
		
		
		base.init = self.init;
		self.init = function()
		{
			base.init();
			_init();	
		}
		
		base.setItems = self.setItems;
		self.setItems = function(p_items)
		{
			base.setItems(p_items);
			if (self.selectFirst)
				self.selectItem(self.items[0], true);
		};
		
		self.moveSelect = function(p_step)
		{
	        var offset = 0;
	        var curIndex = self.items.indexOf(self.selection);
	        var newIndex = curIndex + p_step;
	        if (newIndex < 0)
	        {
	        	newIndex = 0
	        }
	        else if (newIndex > self.items.length - 1)
	        {
	        	newIndex = self.items.length - 1
	        }
	        var curItems = self.items.slice(0, newIndex);
	        var curLength = curItems.length;
	        var $list = self.$e.find('ul');
	        self.selectItem(self.items[newIndex], true);
	        self.selection.$e.scrollIntoView();
		};
		
		self.moveNext = function()
		{
			if ($isEmpty(self.selection))
			{
				self.selectItem(self.items[0], true);
			}
			self.moveSelect(1);
		};
		
		self.moveRrev = function()
		{
			if ($isEmpty(self.selection))
			{
				self.selectItem(self.items[self.items.length - 1], true);
			}
			self.moveSelect(-1);
		};
		
		self.pageUp = function()
		{
			self.selectItem(self.items[0], true);
			self.selection.$e.scrollIntoView();
		};
		
		self.pageDown = function()
		{
			self.selectItem(self.items[self.items.length - 1], true);
			self.selection.$e.scrollIntoView();
		};
		
		function _init()
		{
			self.$e.addClass("dropDown");
			self.$e.addClass("listEditor");
			self.$e.addClass("mx");
		}
		
		self.endOfClass(arguments);
		return self;
	};

	
	me.endOfClass(arguments)
	return me;
};
