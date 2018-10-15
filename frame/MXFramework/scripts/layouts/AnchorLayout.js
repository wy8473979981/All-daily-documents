$ns("mx.layouts");

$import("mx.layouts.AbstractLayout");

/**
 * 锚定式布局控件。
 * 
 * 使用示例请参考 {@link mx.layouts.LayoutFactoryClass.createLayout}。
 */
mx.layouts.AnchorLayout = function()
{
	var me = $extend(mx.layouts.AbstractLayout);
	var base = {};
	
	me.typeName = "AnchorLayout";
	
	
	/**
	 * 计算锚定布局
	 */
	me.calculateAnchors = function()
	{
		$.each(children, function(index)
		{
			var child = children[index];
			var anchor = child.layoutConfigs;
			child.$e.css("position", "absolute");
			if ($notEmpty(anchor))
			{
				var anchorContext = {
					left: anchor.left || child.left,
					right: anchor.right || child.right,
					top: anchor.top || child.top,
					bottom: anchor.bottom || child.bottom
				};
				_calculateAnchor(child, anchorContext);
			}
		});
	};
	
	var children = null;
	/**
     * @ignore
     */
	me._init = function()
	{
		if ($isEmpty(me.owner))
			throw new Error(mx.err("CONTAINTER_NON_NULLABLE"));
		children = me.owner.controls;
		me.owner.$container.resize(_container_resize);
		me.owner.on("ctrladded", _container_ctrladded);
		me.owner.on("ctrlremoved", _container_ctrlremoved);
	};
	
	/*
	 * 计算控件的锚定布局。
	 * @param p_child 控件。
	 * @param p_anchor 锚定点。
	 */
	function _calculateAnchor(p_child, p_anchor)
	{
		var anchorLeft = _convertAnchor(p_anchor.left, true);
		var anchorRight = _convertAnchor(p_anchor.right, true);
		var anchorTop = _convertAnchor(p_anchor.top);
		var anchorBottom = _convertAnchor(p_anchor.bottom);
		var width = _convertSize(p_child.width, true);
		var height = _convertSize(p_child.height);
		
		_calculateAnchorX(p_child, anchorLeft, anchorRight, width);
		_calculateAnchorY(p_child, anchorTop, anchorBottom, height);
	}
	
	/*
	 * 计算控件水平方向上的布局。
	 */
	function _calculateAnchorX(p_child, p_anchorLeft, p_anchorRight, p_width)
	{
		var left = 0, width;
		
		if ($notEmpty(p_anchorLeft))
		{
			left = _calculateLeftByAnchorLeft(p_anchorLeft);
			if ($notEmpty(p_anchorRight))
			{
				width = _calculateWidth(p_anchorRight, left); 
			}
			else if ($notEmpty(p_width))
			{
				width = p_width
			}
			else
			{
				width = _calculateWidth({target: "parent", offset: 0}, left); 
			}
		}
		else if ($notEmpty(p_anchorRight))
		{
			if ($notEmpty(p_width))
			{
				left = _calculateLeftByAnchorRight(p_anchorRight, p_width);
				width = p_width;
			}
			else
			{
				width = _calculateWidth(p_anchorRight, 0); 
			}
		}
		else if ($notEmpty(p_width))
		{
			width = p_width;
		}
		else 
		{
			width = _containerSize.width;
		}

		p_child.$e.css("left", left);
		p_child.$e.width(width);
	}
	
	/*
	 * 根据控件的左锚定点计算控件的左偏移量。
	 */
	function _calculateLeftByAnchorLeft(p_anchorLeft)
	{
		var left;
		if ($isEqual(p_anchorLeft.target, "parent"))
		{
			left = p_anchorLeft.offset;	
		}
		else
		{
			left = parseInt(p_anchorLeft.target.$e.css("left")) + p_anchorLeft.offset + p_anchorLeft.target.$e.outerWidth();
		}
		return left;
	}
	
	/*
	 * 根据控件的右锚定点和空间宽度计算控件的左偏移量。
	 */
	function _calculateLeftByAnchorRight(p_anchorRight, p_width)
	{
		var left;
		if ($isEqual(p_anchorRight.target, "parent"))
		{
			left = _containerSize.width - p_width - p_anchorRight.offset;
		}
		else
		{
			left = _containerSize.width - p_width -  (_containerSize.width - parseInt(p_anchorRight.target.$e.css("left")) + p_anchorRight.offset);
		}
		return left;
	}
	
	/*
	 * 根据控件右锚定点和左偏移量计算控件的宽度。
	 */
	function _calculateWidth(p_anchorRight, p_left)
	{
		var width;
		if ($isEqual(p_anchorRight.target, "parent"))
		{
			width = _containerSize.width - p_left - p_anchorRight.offset;
		}
		else
		{
			width = _containerSize.width - p_left - (_containerSize.width - parseInt(p_anchorRight.target.$e.css("left")) + p_anchorRight.offset);
		}
		return width;
	}
	
	/*
	 * 计算控件垂直方向上的布局。
	 */
	function _calculateAnchorY(p_child, p_anchorTop, p_anchorBottom, p_height)
	{
		var top = 0, height;
		if ($notEmpty(p_anchorTop))
		{
			top = _calculateTopByAnchorTop(p_anchorTop);
			if ($notEmpty(p_anchorBottom))
			{
				height = _calculateHeight(p_anchorBottom, top);
			}
			else 
			{
				height = p_height;
			}
		}
		else if ($notEmpty(p_anchorBottom))
		{
			if ($notEmpty(p_height))
			{
				top = _calculateTopByAnchorBottom(p_anchorBottom, p_height);
				height = p_height;
			}
			else
			{
				height = _calculateHeight(p_anchorBottom, 0);
			}
		}
		else if ($notEmpty(p_height))
		{
			height = p_height;
		}
		else
		{
			height = _containerSize.height;
		}

		p_child.$e.css("top", top);	
		p_child.$e.height(height);
	}
	
	/*
	 * 根据控件的上锚定点计算上偏移量。
	 */
	function _calculateTopByAnchorTop(p_anchorTop)
	{
		var top;
		if ($isEqual(p_anchorTop.target, "parent"))
		{
			top = p_anchorTop.offset;	
		}
		else
		{
			top = parseInt(p_anchorTop.target.$e.css("top")) + p_anchorTop.offset + p_anchorTop.target.$e.outerHeight();
		}
		return top;
	}
	
	/*
	 * 根据控件下锚定点和上偏移量计算控件的高度。 
	 */
	function _calculateHeight(p_anchorBottom, p_top)
	{
		var height;
		if ($isEqual(p_anchorBottom.target, "parent"))
		{
			height = _containerSize.height - p_top - p_anchorBottom.offset;
		}
		else
		{
			height = _containerSize.height - p_top -  (_containerSize.height - parseInt(p_anchorBottom.target.$e.css("top")) + p_anchorBottom.offset);
		}
		return height;
	}
	
	/*
	 * 根据控件的下锚定点和高度计算控件上偏移量。
	 */
	function _calculateTopByAnchorBottom(p_anchorBottom, p_height)
	{
		var top;
		if ($isEqual(p_anchorBottom.target, "parent"))
		{
			top = _containerSize.height - p_height - p_anchorBottom.offset;
		}
		else
		{
			top = _containerSize.height - p_height -  (_containerSize.height - parseInt(p_anchorBottom.target.$e.css("top")) + p_anchorBottom.offset);
		}
		return top;
	}
	
	/*
	 * 转行锚定点中的数值信息。 
	 */
	function _convertSize(p_size, p_axis)
	{
		var size;
		if ($isEmpty(p_axis))
			p_axis = false;
		if ($notEmpty(p_size))
		{
			if ($isString(p_size) && $notEqual(p_size, "auto", false))
			{
				if (p_size.endsWith("%"))
				{
					size = (p_axis ? _containerSize.width: _containerSize.height ) *  parseInt(p_size) / 100;
				}
				else
				{
					size = parseInt(p_size)
				}
			}
			else if ($isNumber(p_size))
			{
				size = p_size;
			}
		}
		return size;
	}
	
	/*
	 * 锚定点数据格式转换。
	 */
	function _convertAnchor(p_value, p_axis)
	{
		if ($isEmpty(p_value))
			return;
		if ($isEmpty(p_axis))
			p_axis = false;
		
		var target,offset;
		
		if ($isNumber(p_value))
		{
			offset = p_value.toString();
		}
		else if ($isString(p_value))
		{
			if (p_value.contain(","))
			{
				var anchor_attrs = p_value.split(",");
				target = anchor_attrs[0];
				offset = anchor_attrs[1];
			}
			else
			{
				offset = p_value;
			}
		
		}
		
		if ($isEmpty(target))
		{	
			target = "parent";
		}
		else if ($notEqual(target, "parent"))
		{
			target = children[target];
			if ($isEmpty(target))
			{
				return;
			}
		}
		
		if (offset.endsWith("%"))
		{
			offset =  (p_axis ? _containerSize.width: _containerSize.height) * parseInt(offset) / 100;
		}
		else 
		{
			offset =  parseInt(offset);
		}
		
		return {"target": target, "offset": offset};
	}
	
	
	var _containerSize = {};
	/*
	 * 容器尺寸改变的事件处理函数。
	 */
	function _container_resize(e)
	{
		_containerSize.width = $(e.target).width();
		_containerSize.height = $(e.target).height();
		
		me.calculateAnchors();
	}
	
	/*
	 * 容器中添加控件的事件处理函数。 
	 */
	function _container_ctrladded(e)
	{
		var child = e.ctrl;
		var anchor = child.layoutConfigs;
		if ($notEmpty(anchor))
		{
			child.$e.css("position", "absolute");
			var anchorContext = {
				left: anchor.left || child.left,
				right: anchor.right || child.right,
				top: anchor.top || child.top,
				bottom: anchor.bottom || child.bottom
			};
			_calculateAnchor(child, anchorContext);
		}
	}
	
	/*
	 * 容器删除控件的事件处理函数。
	 */
	function _container_ctrlremoved(e)
	{
		var child = e.ctrl;
		me.calculateAnchors();
	}
	
	
	
	me.endOfClass(arguments);
	return me;
};
