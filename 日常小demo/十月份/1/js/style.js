function bull(array){

	var temp;
	var len = array.length;
	for(var i=0;i<len;i++)
	{
		for(var j=len-1;j>i;j--)
		{
			if(array[j] < array[j-1])
			{
				temp = array[j];
				array[j] = array[j-1];
				array[j-1] = temp;
			}
		}
	}
	alert(array);
}

bull([3,20,5,25,59,28,59,16]);