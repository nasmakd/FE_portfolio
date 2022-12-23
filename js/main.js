const cont_1 = document.getElementById('cont_1');
const cont_2 = document.getElementById('cont_2');
const cont_3 = document.getElementById('cont_3');
const cont_4 = document.getElementById('cont_4');
const slider = document.getElementById('slider');
const navLi = document.querySelectorAll('#nav li');
const home = document.querySelector('.home');
const svgWrap = document.querySelector('.svgWrap');
const articles = document.querySelectorAll('#wrapper article');
const mouseDown = document.querySelector('.mouseDown');
const s_wid = slider.offsetWidth;
const s_li = slider.children;
const indi_bar = document.getElementById('indi_bar');
let win_wid = window.innerWidth;
let s_move_max = (s_wid - win_wid / 2) * -1;
let s_pos = 0;
let li_pos = 0;
let pct = 0;
const onArticle = (el) => el.nextElementSibling.classList.add('on');
const onPrevArticle = (el) => el.previousElementSibling.classList.add('on');
const offArticle = (el) => el.classList.remove('on');
const menuActive = () => {
	articles.forEach((e, i) => {
		if (articles[i].classList.contains('on')) {
			navLi[i].classList.add('active');
		} else {
			navLi[i].classList.remove('active');
		}
	});
};
const homeActive = () => {
	if (home.classList.contains('active')) {
		svgWrap.classList.remove('hide');
	} else {
		svgWrap.classList.add('hide');
	}
};

window.addEventListener('wheel', (e) => {
	e.preventDefault;
	menuActive();
	homeActive();
});
navLi[0].classList.add('active');
cont_1.addEventListener('wheel', function (e) {
	e.preventDefault;
	if (e.deltaY > 0) {
		onArticle(this);
		offArticle(this);
	}
});

cont_2.addEventListener('wheel', function (e) {
	e.preventDefault;
	if (e.deltaY < 0) {
		offArticle(this);
		onPrevArticle(this);
	} else if (e.deltaY > 0) {
		onArticle(this);
		offArticle(this);
	}
});
cont_3.addEventListener('wheel', function (e) {
	e.preventDefault;
	if (e.deltaY < 0 && s_pos >= 0) {
		onPrevArticle(this);
		offArticle(this);

		return;
	}
	move_slider(e.deltaY);
	on_indicator();
	if (pct == 100) {
		onArticle(this);
		offArticle(this);
		mouseDown.style.display = 'none';
	}
});
cont_4.addEventListener('wheel', function (e) {
	e.preventDefault;
	if (e.deltaY < 0) {
		offArticle(this);
		onPrevArticle(this);
		mouseDown.style.display = 'flex';
		return;
	}
});

function move_slider(amount) {
	s_pos -= amount;
	if (s_pos < s_move_max) {
		s_pos = s_move_max;
		return;
	} else if (s_pos > 0) {
		s_pos = 0;
		return;
	}
	slider.style.transform = `translateX(${s_pos}px)`;
	li_upDown(amount);
}

function li_upDown(amount) {
	li_pos += amount;
	for (let i = 0; i < s_li.length; i++) {
		if (i % 2 != 0) {
			s_li[i].style.transform = `translateY(${li_pos / (i * 5)}px)`;
		} else {
			s_li[i].style.transform = `translateY(${-li_pos / (i * 5)}px)`;
		}
	}
}

function on_indicator() {
	pct = (s_pos * 100) / s_move_max;
	indi_bar.style.clipPath = `
        polygon(0% 0%, ${pct}% 0%, ${pct}% 100%, 0% 100%)
    `;
}

let key_num;
window.addEventListener('keydown', (event) => {
	key_num = event.key;
	if (key_num == 'ArrowDown' || key_num == 'PageDown') {
		if (cont_1.offsetTop == 0) {
			offArticle(cont_1);
			if (
				!cont_4.classList.contains('on') &&
				!cont_3.classList.contains('on')
			) {
				onArticle(cont_1);
			}
			if (cont_4.classList.contains('on') && cont_3.classList.contains('on')) {
				offArticle(cont_2);
			}
		}
		if (cont_2.offsetTop == 0) {
			onArticle(cont_2);
			offArticle(cont_2);
		}
		if (cont_3.offsetTop == 0 && pct == 100) {
			onArticle(cont_3);
			offArticle(cont_3);
			mouseDown.style.display = 'none';
		}
		if (cont_3.offsetTop == 0 && s_pos <= 0) {
			move_slider(100);
			on_indicator();
		}
		if (cont_4.offsetTop == 0) {
			offArticle(cont_2);
		}
		menuActive();
		homeActive();
	} else if (key_num == 'ArrowUp' || key_num == 'PageUp') {
		if (cont_2.offsetTop == 0) {
			onPrevArticle(cont_2);
			offArticle(cont_2);
		}
		if (cont_3.offsetTop == 0 && s_pos >= 0) {
			onPrevArticle(cont_3);
			offArticle(cont_3);
		}
		if (cont_3.offsetTop == 0 && s_pos >= -4000) {
			move_slider(-100);
			on_indicator();
		}
		if (cont_4.offsetTop == 0) {
			onPrevArticle(cont_4);
			offArticle(cont_4);
			mouseDown.style.display = 'flex';
		}
		menuActive();
		homeActive();
	}
});

for (let i = 0; i < navLi.length; i++) {
	navLi[i].addEventListener('click', (e) => {
		for (let j = 1; j < articles.length; j++) {
			offArticle(articles[j]);
			offArticle(articles[0]);
		}
		if (e.target.classList.contains('contact')) {
			mouseDown.style.display = 'none';
		} else {
			mouseDown.style.display = 'flex';
		}
		articles[i].classList.add('on');
		menuActive();
		homeActive();
	});
}

function popWork(target, url) {
	$('#wrap').prepend('<div class="pop_bg" tabindex="0"></div>');
	$('#wrap').addClass('works');

	$.ajax({
		url: `./popup/${url}.html`,
		success: function (result) {
			$('.pop_bg').html(result);
			var h = $('.pop_bg').height();
			$('#wrap').css('height', h);
			$('body, html').animate({ scrollTop: 0 }, 300);
			$('.pop_bg').fadeIn(300).focus();

			console.log($(this));
			console.log($(target));

			$('.layerClose').click(function () {
				$('.pop_bg').fadeOut(300).remove();
				$('#wrap').removeClass('works');
				$('#wrap').css('height', 'auto');

				$(target).focus();
			});

			$('.pop-work').blur(function () {
				$('.pop_bg').fadeOut(300).remove();
				$('#wrap').removeClass('works');
				$('#wrap').css('height', 'auto');

				$(target).focus();
			});
		},
	});
}
