
var userName,socket,tbxUsername,tbxMsg,divChat,whointhisroom;
var whointhisroom = '谁在这个房间里呢<br/>';
function window_onload()
{
	//获取用户名
	divChat = document.getElementById('divchat');
	tbxUsername = document.getElementById('tbxUsername');
	tbxMsg = document.getElementById('tbxMsg');
	tbxUsername.focus();
	tbxUsername.select();
}

function AddMsg(msg)
{
	divChat.innerHTML+=msg + 'br';
	if (divChat.scrollHeight > divChat.clientHeight)
	{
		divChat.scrollTop = divChat.scrollHeight - divChat.clientHeight;

	}


}

function btnLogin_onclick()
{
	if(tbxUsername.value.trim() == '')
	{
		alert('喂，你还没给自己起个名字呢');
		return;
	}
	userName = tbxUsername.value.trim();
	socket = io.connect();
	socket.on('connect', function()
	{
		AddMsg("你已经进入了新世界的大门~");
		socket.on('login', function(name)
		{
			AddMsg('欢迎' + name + "进入Dollars聊天室！");
		});
		socket.on('sendClients', function(names)
		{
			var divRight = document.getElementById(divRight);
			var str = '';
			names.forEach(function(name)
			{
				str+=name+'<br/>';

			});
			divRight.innerHTML=whointhisroom;
			divRight.innerHTML+=str;
		});
		socket.on('chat',function(data)
		{
			AddMsg(data.user+'说：'+data.msg);
		});
		socket.on('disconnect', function()
		{
			AddMsg('啊哦，你好像已经断开连接了哦');
			document.getElementById('btnSend').disabled = true;
			document.getElementById('btnLogout').disabled = true;
			document.getElementById('btnLogin').disabled = '';
			var divRight = document.getElementById('divRight');
			divRight.innerHTML = '啊哦，你好像已经断开连接了哦';

			
		});
		socket.on('logout', function(name)
		{
			AddMsg(name + '已经默默地消失');
		});
		socket.on('duplicate', function(name)
		{
			alert('哎哟有人跟你起了一样的名字哦');
			document.getElementById('btnSend').disabled = true;
			document.getElementById('btnLogout').disabled = true;
			document.getElementById('btnLogin').disabled = '';
		})

		

	});
	socket.on('error', function()
		{
			AddMsg('与服务器的连接发生错误');
			socket.disconnect();
			socket.removeAllListeners('connect');
			io.sockets = {};
		});

	socket.emit('login',userName);
	document.getElementById('btnSend').disabled='';
	document.getElementById('btnLogout').disabled='';
	document.getElementById('btnLogin').disabled=true;




}


function btnSend_onclick()
{
	var msg = tbxMsg.value;
	if(msg.length > 0)
	{
		socket.emit('chat',{user:userName,msg:msg});
		tbxMsg.value='';
	}
}


function btnLogout_onclick()
{
	socket.emit('logout',userName);
	socket.disconnect();
	socket.removeAllListeners('connect');
	io.sockets = {};
	AddMsg(userName + '已经默默地消失');
	var divRight = document.getElementById('divRight');
	//重置房间的用户列表
	divRight.innerHTML = whointhisroom;
	document.getElementById('btnSend').disabled='disabled';
	document.getElementById('btnLogout').disabled='disabled';
	document.getElementById('btnLogin').disabled='';
}

function window_onunload()
{
	socket.emit('logout',userName);
	socket.disconnect();

}