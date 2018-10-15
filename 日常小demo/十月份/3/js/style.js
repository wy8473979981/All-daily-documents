window.onload =function()
{

	var btn = document.getElementById('btn');
	btn.onclick = function()
	{
		
		var rowText = document.getElementById('rowNum');  //行
		var str = rowText.value;
		judgeOne(str);
		

		var colText = document.getElementById('colNum');     //列
		var colstr = colText.value;
		judgeOne(colstr);

		tab(str,colstr);


		
	}
}


//判断是不是数字和在不在1-100范围
function judgeOne(str)
		{
			if(checkStr(str) === false)      
			{
				alert('不全是数字或者不在1-100范围内，有问题');
			}
			

			function checkStr(str)   
			{
				var checkCode;
				for(var i=0;i<str.length;i++)
				{
					checkCode = str.charCodeAt(i);
					var num = Number(str);
					if(checkCode<47 || checkCode>58 || num<1 || num>100)
					{
						return false;
					}
				}
				return true;
			}
		}
		

//生成表格函数
function tab(str1,str2)
{
	var table = document.createElement('table');
		table.border = 1;
			
		var tbody = document.createElement('tbody');
		for(var i=0;i<str1;i++)
		{
			var tr = document.createElement('tr');
			for(var j=0;j<str2;j++)
			{
				var td = document.createElement('td');
				td.height=100;
				td.width = 200;
				td.innerHTML = Math.round(Math.random()*9);
				
				tr.appendChild(td);  //插入节点

			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		document.body.appendChild(table);
}
