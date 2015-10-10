function Countdown()
{
	this.start_time = "30:00"
	this.target_id = "#timer";
	this.name = "timer";
}

Countdown.prototype.init = function()
{
	this.reset();
	setInterval(this.name + '.tick()', 1000);
}

Countdown.prototype.reset = function()
{
	time = this.start_time.split(":");
	this.minutes = parseInt(time_ary[0]);
	this.seconds = parseInt(time_ary[1]);
	this.update_target();
}

Countdown.prototype.tick = function()
{
	if(this.seconds > 0 || this.minutes > 0)
	{
		this.seconds = this.seconds - 1;
		if(this.seconds == 0)
		{
			this.minutes = this.minutes - 1;
			this.seconds = 59;
		}
	}
	this.update_target()
}

Countdown.prototype.update_target = function()
{
	seconds = this.seconds;
	if(seconds < 10) seconds = "0" + seconds;
	$(this.target_id).val(this.minutes + ":" + seconds)
}