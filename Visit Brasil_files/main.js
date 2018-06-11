(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $accordeon = $('[data-component=accordeon]');

function init() {
	var _teste = $('.accordeon__title').click(function(){
		var _parent = $(this).parents('[data-component=accordeon]');

		if(_parent.hasClass('active')) {
			_parent.removeClass('active');
		}else {
			_parent.addClass('active');
		}
		$('.accordeon__content', _parent).stop().slideToggle("slow");
	});

	_teste.eq(0).click();
}

module.exports = {
	init: init
}

},{}],2:[function(require,module,exports){
var $addFavoriteComponent 	= $('[data-component=add-favorite]'),
	favoritesModel 			= localStorage.getItem('favoritesModel') ? JSON.parse(localStorage.getItem('favoritesModel')) : [];


function init() {
	if($addFavoriteComponent.length >= 1) {
		isFav();
		toggleFav();
	}
}



/// Verifica se a página já está no favoritos e modifica o ícone.
function isFav() {
	var pageId 		= $addFavoriteComponent.data('id'),
		totalCat 	= favoritesModel.length,
		isFav;

	if(totalCat <= 0) {
		$addFavoriteComponent.removeClass('add-favorite--active');
		return false;
	}

	for(var i=0; i<totalCat; i+=1) {
		isFav = favoritesModel[i].items.some(function (element, index, array) {
			return element.id === pageId;
		});

		if(isFav) break;
	};

	if(isFav) {
		$addFavoriteComponent.addClass('add-favorite--active');
	}
	else {
		$addFavoriteComponent.removeClass('add-favorite--active');
	}
}


// faz a troca do botão e verifica se chama a função de add ou remove no click do botão.
function toggleFav() {
	$addFavoriteComponent.on('click', function() {
		var $this 		= $(this),
			isActive 	= $this.hasClass('add-favorite--active');

		if(!isActive) {
			addFav($this);
			$addFavoriteComponent.addClass('add-favorite--active');
		}
		else {
			removeFav();
			$addFavoriteComponent.removeClass('add-favorite--active');
		}
	});
}


// Adiciona aos favoritos.
function addFav($this) {
	var catLength = favoritesModel.length,
		fav 	= {},
		items 	= {
			"id": $this.data('id'),
			"title": $this.data('title'),
			"description": $this.data('description'),
			"link": $this.data('link')
		}

	fav.category 	= $this.data('category');
	fav.items 		= [items];

	if(catLength <= 0) {
		favoritesModel.push(fav);
	}
	else {
		for(var i=0; i<catLength; i+=1) {
			if(fav.category === favoritesModel[i].category) {
				favoritesModel[i].items.push(items);
				break;
			}
			else {
				if(i+1 === catLength) {
					favoritesModel.push(fav);
					break;
				}
			}
		};
	}

	setModel();
	App.Modules.favorite.loadFavorite();
}


// Remove dos favoritos.
function removeFav(idItem) {
	var pageId = idItem || $addFavoriteComponent.data('id');

	favoritesModel.forEach(function (element, index, array) {
		var arrCat 		= array,
			indexCat 	= index;

		element.items.forEach(function (element, index, array) {
			if(element.id == pageId) array.splice(index, 1);
			if(array.length <= 0) arrCat.splice(indexCat, 1);
		});
	});

	if(idItem) isFav();
	setModel();
	App.Modules.favorite.loadFavorite();
}


// Atualiza localStorage com novo favorito.
function setModel() {
	localStorage.setItem('favoritesModel', JSON.stringify(favoritesModel));
}


// Recupera os dados dos favoritos.
function getModel() {
	return JSON.parse(localStorage.getItem('favoritesModel'));
}



module.exports = {
	init: init,
	addFav: addFav,
	removeFav: removeFav,
	getFav: getModel
}

},{}],3:[function(require,module,exports){
var $alertGlobal = $('[data-component="alert-global"]');

function init() {
	handleEventsControl();
}

function handleEventsControl() {

	var $openAlert = $alertGlobal.find('.alert-global__bt-open');
	var $closeAlert = $alertGlobal.find('.alert-global__bt-dismiss');

	$openAlert.on('click', function(e){
		var $alertView = handleAlertView();
		$alertView.open($(this));

		e.preventDefault();
	});

	$closeAlert.on('click', function(e){
		var $alertView = handleAlertView();
		$alertView.close($(this));

		e.preventDefault();
	});
}

function handleAlertView() {

	var open = function(el) {
		el.fadeOut().promise().done(function(){
			el.parent().find('.alert-global__bg-wrapper').fadeIn();
		});
	}

	var close = function(el) {
		el.parents('.alert-global__bg-wrapper').fadeOut();
		el.parents('.alert-global').find('.alert-global__bt-open').fadeOut().remove();
	}

	return {
		open: open,
		close: close
	}
}

module.exports = {
	init: init
}

},{}],4:[function(require,module,exports){
var close = $(".notificacao .close");
    var notificacao = $(".notificacao");
function init() {
    closeAlert();
}

if (document.cookie.indexOf("notificacaoVerao") != -1){
    $(".notificacao").addClass('hidden');
    // console.log("existe");
} else {
    // console.log("não existe");
    $(".notificacao").removeClass('hidden');
     verificarBreadcrumb();

};
function verificarBreadcrumb(){
    var breadcrumb = $(".breadcrumb__inner");
    if(breadcrumb.length > 0) {
        var marginNotify = breadcrumb.outerHeight();

        marginNotify += 3;
        console.log(marginNotify);

        $(".notificacao").css("margin-top", marginNotify+"px");
    }
};



function closeAlert(){
    close.on('click', function(e) {
		$(".notificacao").addClass('closeNotify');
        document.cookie = 'notificacaoVerao=SIM';
	});

};

window.OnBeforeUnload = Sair;

function Sair() {
   document.cookie = 'notificacaoVerao=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

module.exports = {
	init: init
}

},{}],5:[function(require,module,exports){
var $alert = $('[data-component="alert"]');

function init() {

	handleCloseAlert();
}

function handleCloseAlert() {
	var $btClose = $alert.find('.alert__bt-close');

	$btClose.on('click', function(e) {
		e.preventDefault();

		$(this).parent().addClass('hidden');
	});
}


module.exports = {
	init: init
}

},{}],6:[function(require,module,exports){
var $basicTooltip = $('[data-component=basic-tooltip]');


function init() {
	if($basicTooltip.length >= 1) startTooltip();
}

function startTooltip() {
	$basicTooltip.on('mouseenter', function(){
		var $this 			= $(this),
			text 			= $this.attr('data-tooltip');


		if($this.find('.basic-tooltip').length < 1)
			$this.append('<div class="basic-tooltip">' + text + '</div>');

		var _h_tooltip = $('.basic-tooltip', $this).height();

		$('.basic-tooltip', $this).stop(true, true).css('top', ((_h_tooltip*-1) - 25)+'px').animate({'opacity': 1}, 300);
	});

	$basicTooltip.on('mouseleave', function(){
		var $this 	= $(this);
		$('.basic-tooltip', $this).stop(true, true).animate({'opacity': 0}, 300);

	});
}


module.exports = {
	init: init
}

},{}],7:[function(require,module,exports){
var $boxMsgError = $('[data-component="box-msg-error"]');

function init() {
	if($boxMsgError.length >= 1) handleCloseBoxError();
}

function handleCloseBoxError() {
	var $btClose = $boxMsgError.find('.box-msg-error__btn-close-error');

	$btClose.on('click', function(e) {
		e.preventDefault();

		$(this).parent().slideUp(500);
	});
}


module.exports = {
	init: init
}

},{}],8:[function(require,module,exports){
var $breadcrumb = $('[data-component=breadcrumb]');

function init() {
	blockBreadcrumbScroll();
}


// Trava Header no scroll
function blockBreadcrumbScroll() {
	$(window).scroll(function () {
		if($(window).width() < 1208) return false;

		if ($(this).scrollTop() > 56) {
		  $breadcrumb.addClass("breadcrumb--fixed");
		} else {
		  $breadcrumb.removeClass("breadcrumb--fixed");
		}
	});
}

module.exports = {
	init: init
}

},{}],9:[function(require,module,exports){
var $cardTooltip 	= $('[data-component=card-tooltip]'),
	dataTooltip 	= {};


function init() {
	if($cardTooltip.length >= 1) startTooltip();
}


function startTooltip() {
	$cardTooltip.on('mouseenter', enterTooltip.debounce(500));
	$cardTooltip.on('mouseleave', leaveTooltip.debounce(500));
}

function enterTooltip() {
	var $this = $(this);

	if($('body').find('.card-tooltip__wrap').length >=1 ) return false;

	dataTooltip.widthEle 		= $this.outerWidth() / 2;
	dataTooltip.link 			= $this.attr('href');
	dataTooltip.image 			= $this.attr('data-image');
	dataTooltip.section 		= $this.attr('data-section');
	dataTooltip.title 			= $this.attr('data-title');
	dataTooltip.text 			= $this.attr('data-text');
	dataTooltip.offSet 			= $this.offset();
	dataTooltip.widthTooltip	= 164 / 2;
	dataTooltip.id				= $this.attr('data-title').replace(/ /g, '-');
	dataTooltip.heightTooltip	= 0;

	var toolTipBody = {
		'html': '<div id="'+ dataTooltip.id + '" class="card-tooltip__wrap">' +
					'<a href="' + dataTooltip.link  + '">' +
						'<figure class="card-tooltip__figure">' +
							'<img src="' + dataTooltip.image + '" alt="Imagem card">' +
						'</figure>' +
						'<span class="card-tooltip__section">' + dataTooltip.section + '</span>' +
						'<span class="card-tooltip__title">' + dataTooltip.title + '</span>' +
						'<p class="card-tooltip__description">' + dataTooltip.text + '</p>' +
						'<button class="card-tooltip__btn"></button>' +
					'</a>' +
				'</div>'
	}

	$('body').append(toolTipBody.html);


	dataTooltip.heightTooltip = $('.card-tooltip__wrap').outerHeight();

	$('body').find('#' + dataTooltip.id).css({
		'top': dataTooltip.offSet.top - dataTooltip.heightTooltip,
		'left': (dataTooltip.offSet.left + dataTooltip.widthEle) - dataTooltip.widthTooltip
	}).stop(true, true)
	.animate({'opacity': 1, 'top': dataTooltip.offSet.top - (dataTooltip.heightTooltip + 13)}, 300);
}

function leaveTooltip() {
	var $this 	= $(this);

	if($('body').find('.card-tooltip__wrap').length <=0 ) return false;

	window.setTimeout(function(){
		$('body').find('#' + dataTooltip.id).stop(true, true)
		.animate({'opacity': 0, 'top': dataTooltip.offSet.top - dataTooltip.heightTooltip}, 300, function(){
			$('#' + dataTooltip.id).remove();
		});
	}, 1000);

}


module.exports = {
	init: init
}

},{}],10:[function(require,module,exports){
var $cardsLimitationContainer = $('[data-cards-limitation]');

function init() {
    if($cardsLimitationContainer.length > 0) limitCards();

    $('[data-cards-limitation] button').click(function(){
        $('[data-cards-limitation]').find('div[data-component="card"]').slice(5).parent().show();
        $(this).hide();
    });
}

function limitCards() {
    var limit = 5;
    if($('[data-cards-limitation]').find('div[data-component="card"]').length > limit){
        $('[data-cards-limitation]').find('div[data-component="card"]').slice(5).parent().hide()
    }
}



module.exports = {
    init: init
}

},{}],11:[function(require,module,exports){
var $cardsCarouselBullets = $('[data-cards-carousel--bullets]');
var $cardsCarouselPagination = $('[data-cards-carousel--pagination]');
var $loadMorehidden = $('[data-loadmore-hidden]');

function init() {
	var mobileBrekpoint = 767;

	if ( $cardsCarouselBullets.length > 0 ) {
		$breakpoints = require('../helpers/breakpoint.js');
		$breakpoints.resizeWindow(mobileBrekpoint, function() {

			handleCarouselBullets();
		}, function() {});

		$breakpoints.initialWindow(mobileBrekpoint, function() {
			handleCarouselBullets();
		}, function() {});

	}

	if ( $cardsCarouselPagination.length > 0 ) {
		$breakpoints = require('../helpers/breakpoint.js');

		$breakpoints.resizeWindow(mobileBrekpoint, function() {
			handleCarouselPagination();
		}, function() {});

		$breakpoints.initialWindow(mobileBrekpoint, function() {
			handleCarouselPagination();
		}, function() {});

	}

	if($loadMorehidden.length > 0) {
		$loadMorehidden.click(function(e) {
			var _btn = $(this);
			e.preventDefault();
			var _data = $(this).data('loadmore-hidden');
			$(_data+'.hidden-carousel').eq(0).show(function() {
				$(this).removeClass('hidden-carousel');
				if($(_data+'.hidden-carousel').length <= 0) {
					_btn.remove();
				}
			});
		});
	}
}

function handleCarouselBullets() {
	if($cardsCarouselBullets.hasClass('slick-slider')) return;
	$cardsCarouselBullets.slick({
		variableWidth: true,
		mobileFirst: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '20px',
		lazyLoad: 'ondemand',
		arrows: false,
		dots: true,

		responsive: [{
			breakpoint: 320,
			settings: {
				centerPadding: '40px',
			}
		},{
			breakpoint: 400,
			settings: {
				centerPadding: '80px',
			}
		},
		{
			breakpoint: 530,
			settings: {
				centerPadding: '100px',
			}
		},
		{
			breakpoint: 600,
			settings: {
				centerPadding: '140px',
			}
		},{
			breakpoint: 767,
				settings: 'unslick'
		}]
	});
}


function handleCarouselPagination() {
	// var $bt_prev = $('.pagination__nav--prev');
	// var $bt_next = $('.pagination__nav--next');

	if($cardsCarouselPagination.hasClass('slick-slider')) return;

	$cardsCarouselPagination.each(function() {
		var $this 		= $(this),
			$bt_prev 	= $this.parent().next('.search-list__results-pagination').find('.pagination__nav--prev'),
			$bt_next 	= $this.parent().next('.search-list__results-pagination').find('.pagination__nav--next'),
			$total 		= $this.find('>div').length;

		$this.parent().next('.search-list__results-pagination').find('.pagination__pages-total').html($total);

		$this.slick({
			variableWidth: true,
			mobileFirst: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20px',
			lazyLoad: 'ondemand',
			arrows: false,
			dots: false,
			prevArrow: $bt_prev,

			responsive: [{
				breakpoint: 320,
				settings: {
					centerPadding: '40px',
				}
			},{
				breakpoint: 400,
				settings: {
					centerPadding: '80px',
				}
			},
			{
				breakpoint: 530,
				settings: {
					centerPadding: '100px',
				}
			},
			{
				breakpoint: 600,
				settings: {
					centerPadding: '140px',
				}
			},{
				breakpoint: 767,
					settings: 'unslick'
			}]
		});

		$bt_prev.on('click', function () {
			$this.slick('slickPrev')
		});

		$bt_next.on('click', function () {
			$this.slick('slickNext')
		});

		$this.on('afterChange', function(event, slick, currentSlide) {
			$this.parent().next('.search-list__results-pagination').find('.pagination__pages-current').html(currentSlide+1)
		});

	});




}

module.exports = {
	init: init,
	handleCarouselBullets: handleCarouselBullets,
	handleCarouselPagination: handleCarouselPagination
}

},{"../helpers/breakpoint.js":48}],12:[function(require,module,exports){
var $customComboComponent = $('[data-component=custom-combo]');


function init() {
	if($customComboComponent.length >= 1) {
		var $handlecCombo = handleCombo();

		$handlecCombo.init();
		handleComboSelect();
	}
}

function handleCombo() {

	function init() {
		$customComboComponent.each(function() {
			$(this).find('.custom-combo__button').bind('click', handle);
		});
	}

	function handle() {
		$(this).parent().hasClass('active') ? closeCombo($(this).parent()) : openCombo($(this).parent())
	}

	var openCombo = function(el) {
		$customComboComponent.removeClass('active').removeClass('limit-height');
		el.addClass('active');
		if(el.data('scroll') && el.data('ajax') == true) handleCustomScroll(el);
		if($('.mCSB_container', el).innerHeight() > 175) {
			el.addClass('limit-height');
		}
	}

	var closeCombo = function(el) {
		el.removeClass('active').removeClass('limit-height');
	}

	return {
		init: init,
		close: closeCombo
	}
}

function handleComboSelect() {
	var $select = $customComboComponent.find('.custom-combo__button');
	var $selectItem = $customComboComponent.find('.custom-combo__options-item');
	var $selectWrapper = $customComboComponent.find('.custom-combo__options');

	var $combo = handleCombo();

	$('body').on('click', '.custom-combo__options-item', function(e) {
		$(this).addClass('active').siblings().removeClass('active');

		handleinsertText($(this), $(this).attr('data-value'));
		$combo.close( $(this).parents('.custom-combo') );

	});
	// chama o plugin para scroll customizado
	$customComboComponent.each(function(){
		if($(this).data('scroll') && !$(this).data('ajax')) handleCustomScroll($(this));
	});

}

function handleinsertText(el, txt) {
	el.parents('.custom-combo').find('.custom-combo__button').html(el.text());
	el.parents('.custom-combo').find('input[type=hidden]').val(txt);
}

function handleCustomScroll(el) {
	var $selectItem = $(el).find('.custom-combo__options');

	$selectItem.mCustomScrollbar();
}

module.exports = {
	init: init,
	insertText: handleinsertText,
	scroll: handleCustomScroll
}

},{}],13:[function(require,module,exports){
var $comboChangeContent = $('.custom-combo--change-content');

function init() {
	if($comboChangeContent.length >= 1) changeContent();
}

function changeContent() {
	$comboChangeContent.find('.custom-combo__options-item').on('click', function(){
		var eleTarget = $(this).data('target');

		$('.combo-change-content').fadeOut(function(){
			$('#' + eleTarget).fadeIn();
		});
	});
}

module.exports = {
	init: init
}

},{}],14:[function(require,module,exports){
var $contextualNav = $('[data-component="contextual-nav"]');

function init() {
	ContextualNavigation();
}

function ContextualNavigation() {
	$('.contextual-nav__bt-close').click(function(){
		$('.contextual-nav').fadeOut(200);
	})
}

module.exports = {
	init: init
}

},{}],15:[function(require,module,exports){
var $countDown = $('[data-component=count-down]');

function init() {
	if($countDown.length >= 1) countDownChar();
}

function countDownChar() {
	var maxLength = 350;
	
	$('textarea').keyup(function() {
  		var length = $(this).val().length;
  		var length = maxLength-length;
  		$('#chars').text(length);
	});
}



module.exports = {
	init: init
}

},{}],16:[function(require,module,exports){
var $currencyConverter 	= $('[data-component=currency-converter]'),
	$convertFrom 		= $("#cbConvertFrom"),
	$convertTo 			= $("#cbConvertTo"),
	$inicialValue 		= $("#inicial-value"),
	$temporaryValue 	= $("#temporary-value"),
	$resultConvertion 	= $("#result-convertion"),
	$changeCurrence 	= $('.currency-converter__refresh'),
	$resultSymbol 		= $('.currency-converter__result-symbol'),
	$startSymbol 		= $('.currency-converter__start-symbol'),
	currency 			= {};


function init() {
	if($currencyConverter.length >= 1) {
		initialValue();
		masks();
		requestCurrency();
		triggers();
		changeCurrency();
	}
}



// Request das infos. de cada moeda.
function requestCurrency(url, cb) {

	$.get('https://api.fixer.io/latest?base=BRL&symbols=USD,EUR', function(data) {
		currency.brl = data.rates;
		converter();
	});

	$.get('https://api.fixer.io/latest?base=USD&symbols=BRL,EUR', function(data) {
		currency.usd = data.rates;
	});

	$.get('https://api.fixer.io/latest?base=EUR&symbols=BRL,USD', function(data) {
		currency.eur = data.rates;
	});
}


// Valores inicias no carregamento.
function initialValue() {
	$('.currency-converter__from').find('.custom-combo__options-item').eq(0).trigger('click');
	$('.currency-converter__to').find('.custom-combo__options-item').eq(2).trigger('click');
	isBrl();
}


function triggers() {
	$currencyConverter.find('.custom-combo__options-item').on("click", function() {
		converter();
	});

	$inicialValue.on("keyup", function() {
		converter();
	});
};


// Aplica conversão de a cordo com a moeda selecionada.
function converter() {
	var baseCurrency 	= $convertTo.val().split('-')[0].trim(),
		startCurrency 	= $convertFrom .val().split('-')[0].trim(),
		startSymbol 	= startCurrency === 'USD' ? '$' : startCurrency === 'EUR' ? '€' : "R$",
		resultSymbol 	= baseCurrency === 'USD' ? '$' : baseCurrency === 'EUR' ? '€' : "R$",
		urlRequest 		= '',
		value;


	$temporaryValue.val($inicialValue.cleanVal());
	$temporaryValue.unmask().mask('#0##.00', {reverse: true});


	// Verifica qual é a moeda de conversão final.
	if(baseCurrency === 'USD') {
		value = (startCurrency === "BRL") ? ($temporaryValue.val() / currency.usd.BRL) : ($temporaryValue.val() / currency.usd.EUR);
		applyChangeCurrency(startSymbol, resultSymbol, value);
	}
	else if(baseCurrency === 'EUR') {
		value = (startCurrency === "BRL") ? ($temporaryValue.val() / currency.eur.BRL) : ($temporaryValue.val() / currency.eur.USD);
		applyChangeCurrency(startSymbol, resultSymbol, value);
	}
	else {
		value = (startCurrency === "USD") ? ($temporaryValue.val() / currency.brl.USD) : ($temporaryValue.val() / currency.brl.EUR);
		applyChangeCurrency(startSymbol, resultSymbol, value);
	}

};


// Quando troca de moeda, faz a troca do simbolo e o cálculo da conversão.
function applyChangeCurrency(startSymbol, resultSymbol, value) {
	var conversion 	= (value) ? value.toFixed(2).replace(/\./g, '') : "";

	$startSymbol.text(startSymbol);
	$resultSymbol.text(resultSymbol);
	$resultConvertion.val(conversion);
	masks();
}


// Alica mask nos campos.
function masks() {
	var patternFrom = $convertFrom.val().split('-')[0].trim() === 'EUR' ? '#,##0.00' : '#.##0,00';
		patternTo = $convertTo.val().split('-')[0].trim() === 'EUR' ? '#,##0.00' : '#.##0,00';

	$inicialValue.mask(patternFrom, {reverse: true});
	$resultConvertion.unmask().mask(patternTo, {reverse: true});
};


// Verifica se é a moeda é o Real e bloqueia o campo.
function isBrl() {
	$('.currency-converter .custom-combo').each(function() {
		var $this = $(this),
			isBrl = $this.find('input[type=hidden]').val();

		if(isBrl === 'BRL - Brazilian real') {
			$this.addClass('custom-combo--locked');
		}
		else {
			$this.removeClass('custom-combo--locked');
		}
	});
}


// Inverte as moedas.
function changeCurrency() {
	$changeCurrence.on('click', function(e) {
		e.preventDefault();

		var initialValueFrom 	= $convertFrom.val(),
			initialValueTo 		= $convertTo.val();

		$('.currency-converter__from').find('.custom-combo__options-item').each(function() {
			var $this = $(this);

			if($this.text() === initialValueTo) $this.trigger('click');
		});

		$('.currency-converter__to').find('.custom-combo__options-item').each(function() {
			var $this = $(this);

			if($this.text() === initialValueFrom) $this.trigger('click');
		});

		isBrl();

		// var valueCurrency = ($convertFrom.val().split('-')[0].trim() === "EUR") ? '€' : '$';

		// if($resultSymbol.text() === 'R$') {
		// 	$resultSymbol.text(valueCurrency);
		// 	$startSymbol.text('R$');
		// }
		// else{
		// 	$resultSymbol.text('R$');
		// 	$startSymbol.text(valueCurrency);
		// }

	});
}



module.exports = {
	init: init
}

},{}],17:[function(require,module,exports){
$customInputDateComponent = $('[data-component="custom-input-date"]');
$customInputDate = $customInputDateComponent = $('.custom-input-date__input');

function init() {
	if($customInputDate.length >= 1) {
		var dates = $customInputDate.datepicker({
			dateFormat: 'dd/mm/yy',
		    onSelect: function(selectedDate) {
		        var option = this.id == "custom-input-datepicker--start" ? "minDate" : "maxDate",
		            instance = $(this).data("datepicker"),
		            date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
		        dates.not(this).datepicker("option", option, date);
		    }
		});
	}
}

module.exports = {
	init: init
}

},{}],18:[function(require,module,exports){
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

module.exports = {
	debounce: debounce
}

},{}],19:[function(require,module,exports){

/* Mostra mapa da Página Destinos */

var $destaqueComponent = $('[data-component=destaque-destinos]'),
	isMap;


$(document).ready(function(){
	$('#btn-show-map').click(function(){
		var _obj = $('.destaque__mapaDestinos');

		_obj.slideToggle("slow").toggleClass('opened');
		if(_obj.is(".opened") === true)
		{
			$('html, body').animate({
				scrollTop: $(this).offset().top - 100
			}, 1000);
		}


		// Load map.
		_obj.append('<div id="map" data-component="map" data-module="destino-home" data-key="rio-de-janeiro" data-type="map__simple-icon map__simple-icon--small map__simple-icon--green" class="map"></div>').promise().done(function() {
			if(isMap) return false;

			isMap = true;
			App.Modules.map.loadMap();
		});
	});

	$('#btn-hide-map').click(function(){
		var _obj = $('.destaque__mapaDestinos');
		_obj.slideUp("slow");
	});
});



/* Efeito de slide horizontal do Banner da interna do Destino */

var $destaqueComponent = $('[data-component=destaque-destino]');

window.size_body = $('body').width();

function init() {
	if($destaqueComponent.length >= 1)
	mapOverlay();
}


var resize = function(){
		var btn = $('#bannerDestinoBtn');
		var banner = $('#bannerDestino');
		var percent = banner.width() / window.size_body;
		var size_button = btn.width()/2;
		var size_body = $('body').width();
		var px_percent = (percent * size_body);
		var actual_left = (percent * size_body) - size_button ;

		btn.css('left',actual_left +'px');
		banner.width(px_percent);
		window.size_body = $('body').width();
}

var animation = function(typeButton){
	//armazena o botão na variavel
	var btn = $('#bannerDestinoBtn');

	//define a variavel porcentagem
	var percent = 0.4;
	var size_body = $('body').width();
	var time_animation = 500;

	if(btn.attr('data-status') == 'open'){
		btn.attr('data-status','close');
		percent = 0.9;
	}
	else{
		btn.attr('data-status','open');

		//Mobile
		if(size_body < 768){
			percent = 0;
		}
		else if(size_body > 768 && size_body < 1208){
		//Tablet
			percent = 0.06;
		}
		else{
			percent = 0.22;
		}
	}
	var banner = $('#bannerDestino');
	var size_button = btn.width()/2;

	var px_percent = (percent * size_body);
	var actual_left = (percent * size_body) - size_button ;

	if(size_body < 768 && typeButton){
		actual_left = actual_left + 54;
	}

	btn.animate({
		left: actual_left +'px'
	}, time_animation);

	banner.animate({
		width:px_percent
	}, time_animation);
}


function mapOverlay() {

	$('#bannerDestinoBtn').on('click',function(){
		var typeButton = $(this).hasClass('destaque__btn--destino-close');


		animation(typeButton);

		if($(this).hasClass('destaque__btn--destino-close')){
			$(this).removeClass('destaque__btn--destino-close');
			$(this).addClass('destaque__btn--destino-open');
		}else{
			$(this).removeClass('destaque__btn--destino-open');
			$(this).addClass('destaque__btn--destino-close');
		}
	} )
		$(window).resize(resize);
		resize();
}

module.exports = {
	init: init
}

},{}],20:[function(require,module,exports){
// if ($('.destinos.home').length) {
//     var SETTINGS = {
//         BASE_URL: 'http://site.guardti.xyz/json/location?module=$module&geocode=$geocode&distance=200&language=$lang',
//         WRAPPER: '.destinos__wrapper.destinos__cards',
//         TEMPLATE_CARD: '<div class="card-hover card-hover--normal" data-componente="card-hover"><a href="$cache" alt="$title" class="card-hover__wrapper"><div class="card-hover__images" style="background-image: url($image)"><div class="card-hover__text-tl title title--iskra">$title</div></div></a></div>'
//     };



//     if (navigator.geolocation) {
//         // navigator.geolocation.getCurrentPosition(function(response){
//         // 	// getItens(true, response);
//         // })
//     }

//     function getItens(geolocation = false, coordinates = '') {
//         if (!geolocation == false) {
//             $.ajax({
//                 url: SETTINGS.BASE_URL.replace(/\$module/g, 'destinos').replace(/\$geocode/g, coordinates.coords.latitude + ',' + coordinates.coords.longitude).replace(/\$lang/g, 'pt'),
//                 type: 'GET',
//                 dataType: 'json'
//             }).then(function(response) {
//                 if (response.numFound > 0) {
//                     handleResult(response.docs);
//                 }
//             })
//         }
//     }

//     function handleResult(response) {
//         var itens = '';
//         for (var i = 0; i < 3; i++) {
//             var result = response[i];
//             itens += SETTINGS.TEMPLATE_CARD
// 	            		.replace(/\$cache/g, result.cache)
// 	            		.replace(/\$title/g, result.title)
// 	            		.replace(/\$image/g, result.picture_url);
//         }

//         $(SETTINGS.WRAPPER).find('.card-hover.card-hover--normal').remove();
//         $(SETTINGS.WRAPPER).append(itens);
//     }
// }

},{}],21:[function(require,module,exports){
var $displayEvents = $('[data-component=display-events]');

function init() {
	if($displayEvents.length > 0) loadDisplayEvents();
}


function loadDisplayEvents() {
	validDate();
}


function validDate() {

	$('#custom-input-datepicker--start, #custom-input-datepicker--end').on('blur', function(){
		var startValue 	= $("#custom-input-datepicker--start").val(),
			endValue 	= $("#custom-input-datepicker--end").val();

		if($('#custom-input-datepicker--start').val() !== '' && $('#custom-input-datepicker--end').val() !== '') {
			compareDate(startValue, endValue);
		}
	});

	// MOBILE
	$('#custom-input-date--start, #custom-input-date--end').on('change', function(){
		var startValue 	= document.getElementById("custom-input-date--start").value,
			endValue 	= document.getElementById("custom-input-date--end").value;

		// Desabilita data anterior a data inicial.
		document.getElementById("custom-input-date--end").setAttribute('min', startValue);

		if($('#custom-input-date--start').val() !== '' && $('#custom-input-date--end').val() !== '') {
			compareDate(startValue, endValue);
		}
		$(this).parents('form').submit();
	});

}


function compareDate(startDt, endDt) {
	if( (new Date(startDt).getTime() > new Date(endDt).getTime())) {
        $(".custom-input-date--end").addClass('error').val('');
        $('.display-events__msg-error').addClass('active');
    }
    else {
    	$(".custom-input-date--end").removeClass('error');
    	$('.display-events__msg-error').removeClass('active');
    }
}



module.exports = {
	init: init
}

},{}],22:[function(require,module,exports){
var $experienciaNav = $('[data-components="experiencia-nav"]');

function init() {
	if( $experienciaNav.length > 0 ) {
		handleNavClick();
		handleNavClickMobile();
		handleNavFix();
		handleScrollBetweenDays();
	}
}

function handleNavClick() {

	$experienciaNav.find('.experiencia-single__nav-day').on('click', function(e) {
		e.preventDefault();

		$experienciaNav.find('.experiencia-single__nav-day').removeClass('active');

		$(this).addClass('active');
		handleScroll( $($(this).attr('href')), -165 );
	});
}

function handleNavClickMobile() {
	var $listWrapper = $('.experiencia-single__nav-days-wrapper');
	$experienciaNav.find('.experiencia-single__nav-days-label').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$listWrapper.toggleClass('active');


	});
}

function handleScroll(target, sub) {
	var scroll = sub ? target.offset().top + sub : target.offset().top;

	$('html, body').animate({
	  scrollTop: scroll
	}, 1000);

	return false;
}

function handleNavFix() {

	var $breakpoints = require('../helpers/breakpoint');
	var $containerDestaque = $('.destaque');
	var top = $containerDestaque.height() + $('.experiencia-single__post').height();

	$breakpoints.resizeWindow(1200, function() {
		top = $containerDestaque.height() + $('.experiencia-single__post').height();
	}, function(){
		top = $containerDestaque.height() + $('.experiencia-single__post').height();
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > top) {
		  $experienciaNav.addClass("experiencia-single__nav--fixed");
		} else {
		  $experienciaNav.removeClass("experiencia-single__nav--fixed");
		}
	});
}

function handleScrollBetweenDays() {

	var num = 0;
	var $headerFix = $('.experiencia-single__nav');
	var $linkNav = $('.experiencia-single__nav-day');

	$(window).on('scroll', function() {

		var $scrollOffset = $(window).scrollTop() + $headerFix.height();
		var $i = 0;

			$('[data-day]').each(function() {
				if( $scrollOffset >= $(this).offset().top) { $i++; }
			});

			if(num != $i || $i == 0) {
				num = $i;

				$linkNav.removeClass('active');
				$('[data-ref="'+num+'"]').addClass('active');
			}
	});
}
module.exports = {
	init: init
}

},{"../helpers/breakpoint":48}],23:[function(require,module,exports){
var $favoriteComponent 	= $('[data-component=favorite]'),
	favoritesModel;

function init() {
	favorites = App.Modules.addFavorite;

	toggleFavorite();
	loadFavorite();
}



function loadFavorite() {

	if(!favorites.getFav()) return false;

	if(favorites.getFav().length <= 0) {
		//Add mensagem de no-results.
		$('.favorite__no-results').addClass('favorite__no-results--active');
	}
	else {
		//Retira mensagem de no-results.
		$('.favorite__no-results').removeClass('favorite__no-results--active');
	}


	$('.favorite__container-category').remove();

	var totalCat 	= favorites.getFav().length,
		totalItem 	= 0,
		tplFav 		= '',
		tplItems 	= '';


	for(var i=0; i<totalCat; i+=1) {
		totalItem += favorites.getFav()[i].items.length;

		favorites.getFav()[i].items.forEach(function (element, index, array) {
			tplItems += "<li id='" + element.id + "' class='favorite__item-list'>" +
							"<a href='" + element.link + "' class='favorite__item-list-link'>" +
								"<span class='favorite__name'>" + element.title + "</span>" +
								"<p class='favorite__description'>" + element.description + "</p>" +
							"</a>" +
							"<button class='favorite__btn-remove'></button>" +
						"</li>"
		});

		tplFav += "<div class='favorite__container-category'>" +
					"<span class='favorite__category'>" + favorites.getFav()[i].category +"</span>" +
					"<ul class='favorite__list'>" +
						tplItems +
					"</ul>" +
					"<button class='favorite__btn-more-fav favorite__btn-more-fav--show'>Show all " + favorites.getFav()[i].items.length + " attractions</button>" +
					"<button class='favorite__btn-more-fav favorite__btn-more-fav--close'>Close attractions</button>" +
				"</div>";

		tplItems = '';
	}

	$('.favorite__container-fav').prepend(tplFav).promise().done(function() {
		$('.favorite__container-category').each(function() {
			var $this 			= $(this),
				qtdItemCategoty = $this.find('.favorite__item-list').length,
				needPagination 	= qtdItemCategoty > 3;

			pagination($this, needPagination);
		});

		customScroll();
	});

	//Adiciona o numero total de favoritos ao icone em destaque.
	$('.favorite__count').text(totalItem);

	// Evento de click do botão de paginação.
	$favoriteComponent.find('.favorite__btn-more-fav').on('click', handleBtnMorefav);

	// Evente de click do botão de excluir favorito.
	$favoriteComponent.find('.favorite__btn-remove').on('click', handleBtnExclude);
}


// Abre e fecha favoritos.
function toggleFavorite() {
	$favoriteComponent.find('.favorite__button').on('click', function() {
		var $this = $(this);

		$this.parent('[data-component=favorite]').toggleClass('favorite--active');
	});
}


function pagination($this, pagination) {
	if(pagination) {
		$this.addClass('active-pagination');
	}
	else {
		$this.removeClass('active-pagination').find('.favorite__item-list:last-child').addClass('no-border');
	}
}


function handleBtnMorefav(data) {
	var $this = $(this);

	$this.parent('.favorite__container-category').find('.favorite__btn-more-fav').toggle();
	$this.parent('.favorite__container-category').find('.favorite__list').toggleClass('full-list');
}


function handleBtnExclude() {
	var $this 		= $(this),
		$itemList 	= $this.parent('.favorite__item-list'),
		itemId 		= $itemList.attr('id');

	$itemList.addClass('remove-item');
	window.setTimeout(function() {
		$itemList.remove();
		favorites.removeFav(itemId);
	}, 500);
}


// Barra de rolagem customizada.
function customScroll() {
    $(".favorite__wrap-list").mCustomScrollbar({
	    callbacks:{
	        onInit:function(){

	        	// Adiciona elemento para fazer o gradient no final do scroll
	        	// após o plugin terminar de ser carregado.
				$('.favorite__wrap-list').append('<span class="favorite__mask"></span>');
		    }
	    }
	});
}



module.exports = {
	init: init,
	loadFavorite: loadFavorite
}

},{}],24:[function(require,module,exports){
var $flightMap 		= $('[data-component="flight-map"]');

function init() {
	if($flightMap.length >= 1) loadMap();
}



function loadMap() {
	getLocation();
}


// Consulta a API de Geolocation.
function getLocation() {
	var dataLocation = {};

	// Verifica se o browser suporta geolocation.
	// if (navigator.geolocation){
	// 	navigator.geolocation.getCurrentPosition(

	// 		// Sucesso
	// 		function(posicao){
	// 			dataLocation.geolocation = true;
	// 			dataLocation.lat = posicao.coords.latitude;
	// 			dataLocation.lon = posicao.coords.longitude;

	// 			isGeolocation.call(dataLocation);
	// 		},

	// 		// Erro
	// 		function(error) {
	// 			dataLocation.geolocation = false;
	// 			isGeolocation.call(dataLocation);
	// 		}
	// 	);
	// }
	// else {
	// 	isGeolocation.call(dataLocation);
	// }

	// Por enquanto, como não temos a API para o mapa do voos,
	// vamos manter sem geolocation e estático.
	isGeolocation.call(dataLocation);
}


// Verifica se existe geolocalização.
function isGeolocation() {

	if(this.geolocation) {
		$flightMap.addClass('flight-map--location');
		addCitySearch(this.lat , this.lon)
		setFlightMap(this.lat , this.lon);
	}
	else {
		$flightMap.addClass('flight-map--no-location');
	}

}


// Retorna dados da cidade de acordo com a latitude e longitude.
function getCity(lat , lon) {
	var dataCity = {},
		reverseGeo = 'https://api.mapbox.com/v4/geocode/mapbox.places/' + lon + ',' + lat + '.json.json?access_token=' + App.Modules.config.tokenMap,
		dataLoc;


	$.ajax({
		url: reverseGeo,
		type: 'GET',
		async: false,
		success: function(data) {
			dataLoc = data;

			dataLoc.features[0].context.forEach(function(element, index, array) {
				if(element.id.indexOf('place') >= 0) {
					dataCity.city = element.text;
				}

				if(element.id.indexOf('country') >= 0) dataCity.countryCode = element.short_code.toUpperCase();
			});

			if(!!!dataCity.city) {
				dataLoc.features.forEach(function(element, index, array) {
					if(element.id.indexOf('region') >= 0) {
						dataCity.city = element.text;
					}
				});
			}
		}
	});


	return dataCity;
}


// Adiciona cidade/pais ao campo de busca.
function addCitySearch(lat, lon) {
	var user = getCity(lat, lon);

	$('.flight-map__field-location').val(user.city + ', ' + user.countryCode);
}


// Traça a linha do voo e sua conexões no mapa.
function setFlightMap(lat, lon) {
	var geolocationFlight = [];

	// Valores de latitude e longitude colocados na mão para testes...
	geolocationFlight.push([[lat, lon], ['4.707828375218317', '-74.06982421875']], [['4.707828375218317', '-74.06982421875'], ['-15.79423574446634', '-47.885284423828125']]);

	L.mapbox.accessToken = App.Modules.config.tokenMap;
	var map = L.mapbox.map('map-home-flight', 'mapbox.streets')
	    .setView([lat, lon], 3);

    // Desabilita zoom do mapa no scroll e teclado.
	map.scrollWheelZoom.disable();
	map.keyboard.disable();

	function obj(ll) {
		return { y: ll[0], x: ll[1] };
	}

	for (var i = 0; i < geolocationFlight.length; i++) {
		var generator = new arc.GreatCircle(
            obj(geolocationFlight[i][0]),
            obj(geolocationFlight[i][1]));

    	var line = generator.Arc(100, { offset: 10 });

    	var newLine = L.polyline(line.geometries[0].coords.map(function(c) {
	        return c.reverse();
	    }))
	    .addTo(map);
	}

	airportMarker(map, geolocationFlight);
}


// Adiciona marker nos aeroportos de partida, conexões e chegada.
function airportMarker(map, geolocationFlight) {
	var arrMarkers = [],
		arrDataMarkers = [],
		count = 0;

	if(geolocationFlight.length > 0) {

		// Gera um unico array com as latidudes e longitudes dos aeroportos.
		geolocationFlight.forEach(function (item, index) {
			arrMarkers.push(item[0]);
			arrMarkers.push(item[1]);
		});

		// Unifica os arrays de latitude e longitude e exclui as coordenadas repetidas.
		arrMarkers = _.uniq(_.flatten(arrMarkers));

		// Percorre o array já corrigido e separa as coordenadas de cada aeroporto.
		arrMarkers.forEach(function(item, index) {
			count++;

			if(count === 2) {
				count = 0;
				return;
			}

			arrDataMarkers.push([arrMarkers[index], arrMarkers[index + 1]]);
		});


		var arr = [((parseInt(arrDataMarkers[0][0]) + parseInt(arrDataMarkers[1][0])) / 2) , ((parseInt(arrDataMarkers[0][1]) + parseInt(arrDataMarkers[1][1]) / 2))]

		// console.log(arr);

		// var marker = L.marker([arrMarkers[0], arrMarkers[1]], {
		//   icon: L.mapbox.marker.icon({
		//     'marker-color': '#f86767'
		//   })
		// }).addTo(map);

		// tick();

		// function tick() {
		// 	marker.setLatLng(L.latLng(arr));
		// }

		var addMarkerAirport = function(item) {
			// Cofigurações do marker
			var cssIcon = L.divIcon({
				className: 'flight-map__marker-airport'
			});

			// Seta latitude, longitude e configurações do ícone.
			L.marker([item[0], item[1]], {icon: cssIcon}).addTo(map);
		}

		var addCityAirport = function(item, city) {
			// Cofigurações do nome do aeroporto
			var cssIcon = L.divIcon({
				className: 'flight-map__marker-city',
				html: city
			});

			// Seta latitude, longitude e configurações do ícone.
			L.marker([item[0], item[1]], {icon: cssIcon}).addTo(map);
		}

		// Percorre Array com as coordenadas dos aeroportos e adiciona os markers/nomes da cidade.
		arrDataMarkers.forEach(function (item, index) {
			var dataAirport = getCity(item[0], item[1]),
				city 		= dataAirport.city + ', ' + dataAirport.countryCode;

				addMarkerAirport(item);
				addCityAirport(item, city);
		});

	}

}



module.exports = {
	init: init
}

},{}],25:[function(require,module,exports){
var $fullMap = $('[data-component="full-map"]');

function init() {
	if($fullMap.length > 0) {
		var _estados = [];
		_estados = $fullMap.data('selected').split(',');
		$.each(_estados, function(i, item) {
			$fullMap.prepend('<span class="full-map-box__dot--'+item+'"></span>');
			$('#full-map-'+item, $fullMap).addClass('active');
		});
	}
}

module.exports = {
	init: init
}

},{}],26:[function(require,module,exports){
var tplt = '<header class="gallery__header">\
<div class="container">\
<div href="#" class="gallery__logo"></div>\
<div class="gallery__wrap-name">\
<h4 class="gallery__name">$title</h4>\
<span class="gallery__date"></span>\
<a href="$path" class="btn-download">Download album</a>\
</div>\
<div class="gallery__wrap-buttons">\
<button class="gallery__close-btn"></button>\
<button class="gallery__change-mode"><span></span><span></span></button>\
<!--<a href="#" class="gallery__share">Share</a>-->\
</div>\
</div>\
</header>\
<div class="gallery__content row">\
<div class="gallery__thumbs container">\
<div class="gallery__wrap-thumbs">\
<ul class="gallery__list-thumbs row"></ul>\
<div data-component="pagination" class="pagination" />\
</div>\
<div class="gallery__details">\
<h5 class="gallery__displaying">Displaying</h5><div class="gallery__total">$start<span>/</span>$total</div><div class="gallery__type">photos</div>\
</div>\
</div>\
<div class="gallery__details-image container">\
<div class="gallery__wrap-full-image">\
<img src="" class="gallery__image-full" alt="">\
</div>\
<div class="gallery__wrap-details-image">\
<div class="gallery__box-details-image">\
<h5 class="gallery__name-image"></h5>\
<p class="gallery__description"></p>\
<a href="#" class="btn-download" target="_blank">Download <span class="btn-download__size"></span></a>\
</div>\
<div class="gallery__box-nav-image">\
<button class="gallery__btn-nav gallery__btn-nav--right"></button>\
<button class="gallery__btn-nav gallery__btn-nav--left"></button>\
<div class="gallery__box-details-nav-image">\
<div class="gallery__total-nav-image">\
<span class="gallery__active-image"></span>\
<span class="gallery__sep">/</span>\
<span class="gallery__total-image"></span>\
</div>\
<div class="gallery__type-nav-image">photos</div>\
</div>\
</div>\
</div>\
</div>\
</div>';

var tplt_thumbs = '<li class="gallery__thumbs-item"><a href="#" class="gallery__thumb-link" data-image="$image" data-name="$title" data-gallery="$galleryId" data-module="$module" data-description="$description" data-download="$download" data-size="$size"></a><picture><img src="$pathImage" alt="$title"></picture></li>';



var $_galleryComponent = $('[data-component=gallery]');
var $_wrapDetailsImage = $('.gallery__wrap-details-image');
var $_dataImage = {};
var $_module = '';
var $_galleryId = 0;
var $_page = 1;
var $_result = '';
var $_sizeAll = 0;
var $_downloadAlbum = SETTINGS.SERVICES+'/helper/files/download.php?gallery=$id&module=$module&language=&language';
var $_downloadPhoto = SETTINGS.SERVICES+'/helper/files/download.php?file=$url';
var $_url = SETTINGS.SERVICES+'/json/gallery/?id=$galleryId&module=$module&start=$start&paged=$paged&language=$language';


function init() {
    if ($_galleryComponent.length >= 1) {

        $('body').delegate('.card-media, .btn-photos','click', function(e) {
            e.preventDefault();

            if($(this).hasClass('card-media')){
	            var button = $(this).find('button');

	            $_module = button.data('module');
	            $_galleryId = button.data('galleryid');
            }

            if($(this).hasClass('btn-photos') || $(this).hasClass('card__content'))
            {
	            $_module = $(this).data('module');
	            $_galleryId = $(this).data('galleryid');
            }




            initGallery($_module, $_galleryId);
        });
    }
}

function initGallery($module, $gallery) {
    openGallery();
    getContent(0, true).then(function(result) {
        $_result = result;
        setContent(result);
    });
}


function getContent(start, paged) {
    return $.getJSON($_url.replace(/\$galleryId/g, $_galleryId).replace(/\$module/g, $_module).replace(/\$start/g, start).replace(/\$paged/g, paged).replace(/\$language/g, document.documentElement.lang));
}

function setContent(result) {
    var tpl = $(tplt).clone();


    // thumbs
    $('.gallery__change-mode', tpl).hide();
    $('.gallery__list-thumbs', tpl).html('');
    setThumb(result, true, tpl);
    // end

    $_downloadAlbum = $_downloadAlbum.replace(/\$id/, result.id).replace(/\$module/, result.module);
    $('.gallery__wrap-name .btn-download', tpl).attr('href', $_downloadAlbum).text(window.translates.albumdefotos.downloadAlbum);
    $('.gallery__name', tpl).html($('.gallery__name', tpl).text().replace(/\$title/g, result.data[$_module].title));

    $('.gallery__date', tpl).text(window.translates.albumdefotos.lastUpdate + ' ' + result.lastUpdateStr);

    $_galleryComponent.html(tpl);


    $_sizeAll = result.total;

}


function openGallery() {
    $('body').addClass('modal-open');
    $_galleryComponent.html('').fadeIn();
}



function setThumb(result, start, tpl) {
    var thumbs = '',
        galleryId = result.id,
        module = result.module;
    $.each(result.data.pictures, function(i, item) {
        thumbs += tplt_thumbs.replace(/\$image/g, ((i + 1) + (($_page - 1) * $_result.rows)))
            .replace(/\$title/g, item.picture_line)
            .replace(/\$description/g, item.picture_description)
            .replace(/\$galleryId/g, galleryId)
            .replace(/\$module/g, module)
            .replace(/\$download/g, item.picture_path)
            .replace(/\$size/g, '2.3mb')
            .replace(/\$pathImage/g, item.picture_path)
            .replace(/\$title/g, item.picture_line);
    });


    $('.gallery__list-thumbs', tpl).html(thumbs);
    $('.gallery__displaying', tpl).text(window.translates.albumdefotos.displaying);

    if (result.total > 1) {
        $('.gallery__type', tpl).text(window.translates.albumdefotos.photos);
    } else {
        $('.gallery__type', tpl).text(window.translates.albumdefotos.photo);
    }

    if (result.start == result.last) {
        $('.gallery__total', tpl).html((result.start + 1) + '<span>-</span>' + result.last + ' de ' + result.total);
    } else {
        $('.gallery__total', tpl).html(result.last + ' de ' + result.total);
    }

    if (start) {
        $('.gallery__list-thumbs .gallery__thumbs-item .gallery__thumb-link', tpl).eq(0).addClass('active');
    }

    $('.gallery__list-thumbs .gallery__thumbs-item .gallery__thumb-link', tpl).on('click', openImageDetails);

    $('.gallery__btn-nav--right', tpl).on('click', changeImagesNext);
    $('.gallery__btn-nav--left', tpl).on('click', changeImagesPrev);

    $('.gallery__change-mode', tpl).on('click', changeGalleryMode);
    $('.gallery__close-btn', tpl).on('click', closeGallery);

    Pagination(result, tpl);
}

function startEvents() {
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('[data-component=gallery]').fadeOut(500);
        }
    });
}
var currentImage = 0;
var allGalleryData = {};

function openImageDetails(e) {
    var index = $(this).data('image'),
        galleryId = $(this).data('gallery'),
        module = $(this).data('module'),
        url = $_url.replace(/\$galleryId/g, galleryId)
        .replace(/\$module/g, module)
        .replace(/\$start/g, 0)
        .replace(/\$paged/g, false)
        .replace(/\$language/g, document.documentElement.lang);

    console.log(url);
    currentImage = index;
    $.getJSON(url).then(function(response) {
        if (response.data.pictures.length > 0) {
            $('.gallery__change-mode').addClass('active').fadeIn();
            allGalleryData = response;
            changeGalleryMode(currentImage);
        }
    });

    return false;
}


function closeGallery() {
    $_galleryComponent.fadeOut(function() {
        $(this).empty();
    });
    $('body').removeClass('modal-open');


}

function changeGalleryMode(index) {
    currentImage = index;
    $('.gallery__thumbs', $_galleryComponent).toggleClass('gallery__thumbs--hidden');
    $('.gallery__details-image', $_galleryComponent).toggleClass('gallery__details-image--active');
    $('.gallery__change-mode', $_galleryComponent).toggleClass('active');

    if (!$('.gallery__details-image', $_galleryComponent).hasClass('gallery__details-image--active')) {
        $('.gallery__change-mode', $_galleryComponent).hide();
    }

    changeDetailsImage(currentImage);
}

function changeImagesPrev(e) {
    currentImage--;
    changeDetailsImage();
    e.preventDefault();
}

function changeImagesNext(e) {
    currentImage++;
    changeDetailsImage();
    e.preventDefault();
}

function changeDetailsImage() {
    if ($_galleryComponent.find('.gallery__details-image').hasClass('gallery__details-image--active')) {
        var active = $('.gallery__thumb-link.active');
        if (currentImage <= 0) {
            currentImage = 1;
        } else if (currentImage >= allGalleryData.data.pictures.length) {
            currentImage = allGalleryData.data.pictures.length;
        }

        if (typeof allGalleryData !== 'undefined') {
            var current = allGalleryData.data.pictures[currentImage - 1];
        }

        $_galleryComponent.find('.gallery__name-image').html('').html(current.picture_line);
        $_galleryComponent.find('.gallery__box-details-image .btn-download').attr('href', $_downloadPhoto.replace(/\$url/g, current.picture_path));
        $_galleryComponent.find('.gallery__description').html(current.picture_description);


        $_galleryComponent.find('.gallery__active-image').text(currentImage);
        $_galleryComponent.find('.gallery__total-image').text(allGalleryData.data.pictures.length);
        $_galleryComponent.find('.gallery__wrap-full-image img').attr('src', current.picture_path);

        if (allGalleryData.data.pictures.length > 1) {
            $_galleryComponent.find('.gallery__type-nav-image').text(window.translates.albumdefotos.photos);
        } else {
            $_galleryComponent.find('.gallery__type-nav-image').text(window.translates.albumdefotos.photo);
        }
    }
}

var Filter = {
    tpl: {
        pagination: '<div data-component="pagination" class="pagination" />',

        pagPrev: '<button type="button" class="pagination__nav pagination__nav--prev"></button>',

        pagNext: '<button type="button" class="pagination__nav pagination__nav--next"></button>',

        pagItemsHolder: '<ul class="pagination__list" />',

        pagItem: '<li class="pagination__list-item"><a href="#" class="pagination__list-link"></a></li>',

        pagNoItem: '<li class="pagination__list-item pagination__list-item"><a href="#" class="pagination__list-link pagination__list-link--noitem">...</a>',

        pagPages: '<div class="pagination__pages">' +
            '<strong class="pagination__pages-current"></strong>' +
            ' / <span class="pagination__pages-total"></span>' +
            '</div>'
    }
}

function Pagination(r, tpl) {
    var c = $('.pagination', tpl);


    if (r.total >= (r.start)) {
        c.html('');

        var tpl = $(Filter.tpl.pagination).clone();

        var totalPages = Math.ceil(r.total / r.rows);
        var current = Math.floor((r.start + r.rows) / r.rows);


        if (r.start > 0) {
            var prev = $(Filter.tpl.pagPrev).clone();

            $(prev).attr('data-start', (current - 2) * r.rows);
            $(tpl).append(prev);
        }

        if (r.hasNext) {
            var next = $(Filter.tpl.pagNext).clone();

            $(next).attr('data-start', current * r.rows);
            $(tpl).append(next);
        }

        if (totalPages > 1) {
            var holder = $(Filter.tpl.pagItemsHolder).clone();
            var among = 5;

            // startpage
            addItem(holder, r, 1);
            if (current > 3 && totalPages > among) {
                $(holder).append($(Filter.tpl.pagNoItem).clone());
            }


            var startFor = 1;
            var endFor = among;
            if (totalPages > among) {
                startFor = ((current - 3) >= 1) ? (current - 2) : 1;
                if (current >= 4)
                    endFor = current + 2;
                if ((totalPages - current) < 2) {
                    startFor = (current != totalPages) ? startFor - (totalPages - current) : endFor - (among + 1);

                }
            }

            for (i = startFor; i <= endFor; i++) {
                if (i != 1 && i != totalPages && i <= totalPages) {
                    addItem(holder, r, i);
                }
            }

            // endpage
            if ((current + 2) < totalPages && totalPages > among) {
                $(holder).append($(Filter.tpl.pagNoItem).clone());
            }
            addItem(holder, r, totalPages);


            $(tpl).append(holder);
        }



        var pagPages = $(Filter.tpl.pagPages).clone();
        $(pagPages).find('strong.pagination__pages-current').html(current);
        $(pagPages).find('span.pagination__pages-total').html(totalPages);

        $(tpl).append(pagPages);

        c.html(tpl);

        function addItem(holder, r, number) {
            var item = $(Filter.tpl.pagItem).clone();
            $('a', item)
                .attr({
                    'data-start': (number - 1) * r.rows
                })
                .html(number);

            if (number == current) $(item).find('a').addClass('active');
            $(holder).append(item);
        }

    }

    $('body').delegate('.pagination__nav', 'click', function(e) {
        getContent($(this).attr('data-start'), true).then(function(result) {
            var $_result = result;
            setThumb(result, true, $_galleryComponent);
        });

        e.preventDefault();
    });

    $('body').delegate('.pagination__list-item > a', 'click', function(e) {
        getContent($(this).attr('data-start'), true).then(function(result) {
            var $_result = result;
            setThumb(result, true, $_galleryComponent);
        });

        e.preventDefault();
    })

}

function reloadContent($page) {
    getContent($page).then(function(result) {
        var $_result = result;
        setThumb(result, true, $_galleryComponent);
    });
}

module.exports = {
    init: init
}

},{}],27:[function(require,module,exports){
function init() {
	$.jMaskGlobals = {
		maskElements: 'input,td,span,div',
		dataMaskAttr: '*[data-mask]',
		dataMask: true,
		watchInterval: 300,
		watchInputs: true,
		watchDataMask: false,
		byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
		translation: {
			'0': {pattern: /\d/},
			'9': {pattern: /\d/, optional: true},
			'#': {pattern: /\d/, recursive: true},
			'A': {pattern: /[a-zA-Z0-9]/},
			'S': {pattern: /[a-zA-Z]/}
		}
	};
}

module.exports = {
	init: init
}

},{}],28:[function(require,module,exports){
var $idiomasComponent = $('[data-component=languages]');

function init() {
	if($idiomasComponent.length >= 1) handleSelectToggle();
}

function handleSelectToggle() {
	var $label = $('.languages__label');

	$label.on('click', function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active');
		$(this).parents('.languages').toggleClass('active');
	})

	function handleItemSelect() {
		var $item = $('.languages__options-item');

		var languages = {
			'en-US':'/en/',
			'pt-BR':'/pt/',
			'es-ES':'/es/'
		};

		$item.on('click', function() {

			var windowUrl = window.location.pathname,
				url = windowUrl.replace(languages[document.documentElement.lang], $(this).data('language') + '/');



			$(this).addClass('active').siblings().removeClass('active')
			$(this).parents('.languages').find('.languages__label').trigger('click');

			// window.location.href = window.location.protocol +'//'+ window.location.hostname +'/'+ url;
		});


	}

	handleItemSelect();
}

module.exports = {
	init: init
}

},{}],29:[function(require,module,exports){
$breakpoints = require('../helpers/breakpoint.js');
var loadMore = $('button.loadmore');

function init() {
	$(loadMore).on('click',function(e){
		var $this = $(this),
		_parent = $this.parent(),
		next = hasNext(_parent),
			module = $this.data('module');

		var index = 0;
		if(next == true){
			index = $('.cards-carousel > div', _parent).length +1;
		}else{
			$($this, _parent).hide();
		}

		requestService(module,index, _parent);

		e.preventDefault();
	})
}

function getItens() {

}

function hasNext(parent){
	var last = $('.cards-carousel > div', parent).last().attr('data-next');
	return ((typeof last == 'undefined') || last == 'true') ? true : false;
}

function addCard(cards, parent){
	$('.cards-carousel', parent).append(cards);
}

// Faz o request para a API retornada do back com os dados do mapa.
function requestService(module, page, parent) {
	var lang = (document.documentElement.lang != "") ? document.documentElement.lang : 'PT';

	var url = SETTINGS.SERVICES+'/json/loadmore/?module='+module+'&language='+lang+'&pg='+page

	var request = $.ajax({
		url: url,
		method: 'GET',
		dataType: 'html'
	});

	request.done(function(data) {
		addCard(data, parent);
	});

	request.fail(function(jqXHR, textStatus) {
		console.log('Request Error!');
	});
}


module.exports = {
	init: init,
	itens: getItens
}

},{"../helpers/breakpoint.js":48}],30:[function(require,module,exports){
$breakpoints = require('../helpers/breakpoint.js');
var $map 	= $('[data-component="map-atividade"]'),
	map,
	dataMap = {};

function init() {
	if($map.length >= 1) loadMap();
}

function loadMap() {
	// var dataMap = {};
	$map 	= $('[data-component="map-atividade"]');
		console.log('here');


	L.mapbox.accessToken = App.Modules.config.tokenMap;
	dataMap.key = $map.data('key');
	dataMap.activity = $map.data('activity');
	dataMap.state = $map.data('state');
	dataMap.type = $map.data('type');
	dataMap.module = $map.data('module');
	dataMap.language = $('html').attr('lang');

	var mapAttr = $map.data('map');
	if(typeof mapAttr !== 'undefined') {
		mapAttr = JSON.parse(JSON.stringify(mapAttr));
		dataMap.map = mapAttr[0];
	}


	requestService(dataMap);
}

function setDataMap(data, map) {
	// if((typeof dataMap.map !== 'undefined') == false) {
	// 	map.setView([dataMap.map.lat, dataMap.map.lon], dataMap.map.zoom);
	// } else {
	// 	map.setView([data.lat, data.lon], data.zoom);
	// }
}


function addMarker(data) {
	// Percorre os mapas da página faz o load do mapa e adiciona os pins.
	var $this 		= $map,
		map 		= $this.attr('id'),
		iconDefault	= $this.data('type'),
		iconClass 	= '',
		iconTotal 	= '';



	map = L.mapbox.map(map, 'mapbox.streets');

	// Desabilita zoom do mapa no scroll e teclado.
	map.scrollWheelZoom.disable();
	map.keyboard.disable();


	if(typeof data.marker !== 'undefined' && data.marker.length >= 1) {
		// map.setCenter(data.marker[0].lat, data.marker[1].lng);
		map.setView([data.marker[0].lat, data.marker[1].lng], 6);
		data.marker.forEach(function (item, index) {
			if(typeof item !== 'undefined'){
				iconClass = setTypeClass(item);
				iconTotal = (typeof item.total === 'undefined') ? '' : item.total;

				// Cofigurações do icone
				var cssIcon = L.divIcon({
					className: 'map__simple-icon map__simple-icon--green',
					html: iconTotal
				});

				// Seta latitude, longitude e configurações do ícone.
				L.marker([item.lat, item.lng], {icon: cssIcon}).addTo(map).on('click',function(){
					openBox(item);
				});
			}

		});
	}

	mobileMap($this.attr('id'), map, data);

}

function openBox(data){
	var box = $('.atividade__widget.atividade__weather .weather__wrapper');
	box.removeClass('active');

	$('.weather__degree-number--now,.weather__degree-number--average.celsius,.weather__degree-number--low.celsius,.weather__degree-number--average.fahrenheit.weather__degree-number--low.fahrenheit',box).html("");



	$('.weather__degree-number.weather__degree-number--now')
		.html(data.temperature.celsius_max + 'ºc');
	$('.weather__degree-number.weather__degree-number--average.celsius')
		.html(data.temperature.celsius_max + "<span>C</span>");

	$('.weather__degree-number.weather__degree-number--low.celsius')
		.html(data.temperature.celsius_min + "<span>C</span>");

	$('.weather__degree-number.weather__degree-number--average.fahrenheit')
		.html(data.temperature.fahrenheit_max + "<span>F</span>");

	$('.weather__degree-number.weather__degree-number--low.fahrenheit')
		.html(data.temperature.fahrenheit_min + "<span>F</span>");


	box.toggleClass('active');


	console.log(data);
}


// Retorna o tipo de icone que vai ser exibido no mapa.
function setTypeClass(item) {
	var typeIcon = '';

	if(item.type === 'experience') {
		typeIcon = 'map__star-icon map__star-icon--orange'
	}
	else if(item.type === 'airport') {
		typeIcon = 'map__simple-icon map__simple-icon--blue'
	}
	else if(typeof item.total !== 'undefined') {
		typeIcon = 'map__number-icon'
	}
	else {
		typeIcon = 'map__simple-icon map__simple-icon--green'
	}

	return typeIcon;
}


// Faz o request para a API retornada do back com os dados do mapa.
function requestService(dataMap)
{
	var url = SETTINGS.SERVICES+'/json/atividades/?atividade=' + dataMap.activity + '&type='+dataMap.type+'&state='+dataMap.state+'&language=' + dataMap.language+'&key='+dataMap.key+'&module='+dataMap.module;

	console.log(url);
	var request = $.ajax({
		url: url,
		method: 'GET',
		dataType: 'json'
	});

	request.done(function(data) {
		addMarker(data);
	});

	request.fail(function(jqXHR, textStatus) {
		console.log('Request Error!',jqXHR, textStatus);
	});
}


// Modifica o zomm do mapa na versão mobile
function mobileMap(typeMap, map, data) {
	var zoom = typeMap === 'map-home' ? 1 : 2;

	$breakpoints.resizeWindow(767, function() {

		if((typeof data == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data, map);
		}
	}, function() {
		if((typeof data == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data, map);
		}
	});

	$breakpoints.initialWindow(767, function() {
		if((typeof data == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data, map);
		}
	}, function() {
		if((typeof data == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data, map);
		}
	});
}


module.exports = {
	init: init,
	loadMap: loadMap
}

},{"../helpers/breakpoint.js":48}],31:[function(require,module,exports){
$breakpoints = require('../helpers/breakpoint.js');
var $map 	= $('[data-component="map"]'),
	map,
	dataMap = {}
	setDataMapOldData = {};

function init() {
	if($map.length >= 1) loadMap();
}

function loadMap() {
	// var dataMap = {};
	$map 	= $('[data-component="map"]');

	L.mapbox.accessToken = App.Modules.config.tokenMap;
	dataMap.key = $map.data('key');
	dataMap.module = $map.data('module');
	dataMap.language = $('html').attr('lang');

	var mapAttr = $map.data('map');
	if(typeof mapAttr !== 'undefined') {
		mapAttr = JSON.parse(JSON.stringify(mapAttr));
		dataMap.map = mapAttr[0];
	}


	requestService(dataMap);
}

function setDataMap(data, map) {
	if(typeof data !== 'undefined') {
		/* $.each(data, function(i, item) {
			console.log(i, item)
		}); */
		// if(data.lat != setDataMapOldData.lat && data.lon != setDataMapOldData.lon && data.zoom != setDataMapOldData.zoom) {
			// setDataMapOldData = data;
			map.setView([data.lat, data.lon], data.zoom);

		// }
	} else {
		map.setView([dataMap.map.lat, dataMap.map.lon], dataMap.map.zoom);
	}
}


function addMarker(data) {
	// Percorre os mapas da página faz o load do mapa e adiciona os pins.
	$map.each(function(i) {
		var $this 		= $(this),
			map 		= $this.attr('id'),
			iconDefault	= $this.data('type'),
			iconClass 	= '',
			iconTotal 	= '';

		map = L.mapbox.map(map, 'mapbox.streets');

		// Desabilita zoom do mapa no scroll e teclado.
		map.scrollWheelZoom.disable();
		map.keyboard.disable();

		// Seta latitude, longitude e zoom do mapa.
		if((typeof data[i] == 'undefined') == true){
			setDataMap(data, map);

			iconClass = setTypeClass('');
			iconTotal = '';

			// Cofigurações do icone
			var cssIcon = L.divIcon({
				className: iconClass,
				html: iconTotal
			});


			// Seta latitude, longitude e configurações do ícone.
			if(Array.isArray(data.marker)) {
				$.each(data.marker, function(i, item) {
					L.marker([item.lat, item.lon], {icon: cssIcon}).addTo(map);
				})
			} else {
				L.marker([data.marker.lat, data.marker.lon], {icon: cssIcon}).addTo(map);
			}

		}else{
			setDataMap(data[i], map);
			if(Array.isArray(data[i].marker) != true)
				data[i].marker = [data[i].marker];

			// console.log(data[i].marker);
			if(typeof data[i].marker !== 'undefined' && data[i].marker.length >= 1) {
				data[i].marker.forEach(function (item, index) {
					if(typeof item !== 'undefined'){
						iconClass = (typeof item.total !== 'undefined' || typeof iconDefault === 'undefined') ? setTypeClass(item) : iconDefault;
						iconTotal = (typeof item.total === 'undefined') ? '' : item.total;

						// Cofigurações do icone
						var cssIcon = L.divIcon({
							className: iconClass,
							html: iconTotal
						});


						// Seta latitude, longitude e configurações do ícone.
						L.marker([item.lat, item.lon], {icon: cssIcon}).addTo(map);
					}

				});
			}
		}

		mobileMap($this.attr('id'), map, data, i);

	});
}


// Retorna o tipo de icone que vai ser exibido no mapa.
function setTypeClass(item) {
	var typeIcon = '';

	if(item.type === 'experience') {
		typeIcon = 'map__star-icon map__star-icon--orange'
	}
	else if(item.type === 'airport') {
		typeIcon = 'map__simple-icon map__simple-icon--blue'
	}
	else if(typeof item.total !== 'undefined') {
		typeIcon = 'map__number-icon'
	}
	else {
		typeIcon = 'map__simple-icon map__simple-icon--green'
	}

	return typeIcon;
}


// Faz o request para a API retornada do back com os dados do mapa.
function requestService(dataMap) {

	var url = SETTINGS.SERVICES+'/json/map/?module=' + dataMap.module + '&key=' + dataMap.key + '&language=' + dataMap.language;
		// envUrl = /localhost/i.test(location.hostname) ? App.Modules.config.url.map[dataMap.module] : url;

	// console.log(dataMap);

	var request = $.ajax({
		// url: 'http://site.guardti.xyz' + url,
		url: url,
		method: 'GET',
		dataType: 'json'
	});

	request.done(function(data) {
		addMarker(data);
	});

	request.fail(function(jqXHR, textStatus) {
		console.log('Request Error!');
	});
}


// Modifica o zomm do mapa na versão mobile
function mobileMap(typeMap, map, data, i) {
	var zoom = typeMap === 'map-home' ? 1 : 2;

	$breakpoints.resizeWindow(767, function() {

		if((typeof data[i] == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data[i], map);
		}
	}, function() {
		if((typeof data[i] == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data[i], map);
		}
	});

	$breakpoints.initialWindow(767, function() {
		if((typeof data[i] == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data[i], map);
		}
	}, function() {
		if((typeof data[i] == 'undefined') == true){
			setDataMap(data, map);
		}else{
			setDataMap(data[i], map);
		}
	});
}


module.exports = {
	init: init,
	loadMap: loadMap
}

},{"../helpers/breakpoint.js":48}],32:[function(require,module,exports){
var $MenuHamburguerComponent = $('[data-component=menu-hamburguer]');

function init() {
	toggleMenu();
}

function toggleMenu() {
	$MenuHamburguerComponent.on('click', function() {
		var $this = $(this);

		$this.toggleClass('is-active');
		$('.header__bottom-area').toggleClass('header__bottom-area--nav-active');
	});
}

module.exports = {
	init: init
}

},{}],33:[function(require,module,exports){

/// event

$('.modalvideo').on('click', function() {
    var url = $(this).data('video');
    createUrlVideo(url);
});

$('#landing__modalVideo--close').on('click', function() {
    ModalClose_video();
})



//// function modal

function createUrlVideo(url) {
    var urlBreak = url.split('watch?v='),
        urlBreak_id = urlBreak[1],
        urlEmbed = 'https://www.youtube.com/embed/'+urlBreak_id,
        urlVideo = urlEmbed + '?modestbranding=0&rel=0&amp&controls=1&showinfo=0&html5=1&autoplay=1';
    createIframe(urlVideo);
}

function createIframe(url) {
    $("#landing__modalVideo iframe").attr('src', url);
    ModalOpen_video()
}




function ModalOpen_video() { 
    $( "#landing__modalVideo" ).animate({
        opacity: 1,
    }, 300, function() {
        $("body").attr('id','modalVideo_Open')
    });
}

function ModalClose_video() {
        $( "#landing__modalVideo" ).animate({
            opacity: "0",
        }, 
        {
            duration: 500,
            complete: function()
        {
            $('body').removeAttr('id');
            $("#landing__modalVideo iframe").attr('src', '');
        }
  });
}

},{}],34:[function(require,module,exports){
var $newsletterComponent = $('[data-component=newsletter]');

function init() {
	submitNewsletter();
}

function submitNewsletter() {
	$('.btnNewsLetter').click(function(){

		$('#newsletter-form').submit(function () { return false; });

		var sEmail	= $('.newsletterMail').val();
		var emailFilter=/^.+@.+\..{2,}$/;
		var illegalChars= /[\(\)\<\>\,\;\:\\\/\"\[\]]/

		if(!(emailFilter.test(sEmail))||sEmail.match(illegalChars)){
			$('.fail').show();
			$('.newsletterMail').css("border-color", "red");
		}else{

			$.ajax({
				url:'/',
				type: 'GET',
				data: {email: sEmail},
				success: function(){
					$('.fail').hide();
					$('.newsletterMail').css("border-color", "transparent");
					$('#newsletter-form').fadeOut(250);
					$('.sucesso').fadeIn(1400);
					window.setTimeout(function (argument) {
						$('.sucesso').fadeOut(350);
					},4000)
					window.setTimeout(function (argument) {
						$('#newsletter-form').fadeIn(2400);
						$('.newsletterMail').val('');
					},4500)
				}
			});
		}
	})
}

module.exports = {
	init: init
}

},{}],35:[function(require,module,exports){
var $popularPostsComponent 	= $('[data-component=popular-posts]'),
	$itemNav 				= $('.popular-posts__item-description'),
	$boxTitle 				= $('.popular-posts__box-title'),
	$wrapTitle 				= $('.popular-posts__wrap-title'),
	indexItem 				= 0,
	totalItem 				= $itemNav.length,
	timeSlider,
	activeItem;


var $breakpoints = require('../helpers/breakpoint');




function init() {
	if($popularPostsComponent.length >= 1) {

		// No carregamento da página.
		$breakpoints.initialWindow(768, function() {
			sliderMobile();
		}, function(){
			initialItem();
			changeItemAuto();
			startEvents();
		});

		// No resize do browser.
		$breakpoints.resizeWindow(768, function() {
			$boxTitle.off('mouseenter');
			$boxTitle.off('mouseleave');
			$itemNav.off('mouseenter');
			$itemNav.off('mouseleave');
			stopSlider();

			sliderMobile();
		}, function(){
			$wrapTitle.slick('unslick');

			initialItem();
			changeItemAuto();
			startEvents();
		});

	}
}



function initialItem() {
	$itemNav.eq(indexItem).addClass('active');
	$boxTitle.eq(indexItem).addClass('active');
}


function startEvents() {
	$boxTitle.on('mouseenter', stopSlider);
	$boxTitle.on('mouseleave', changeItemAuto);
	$itemNav.on('mouseenter', changeItemHover);
	$itemNav.on('mouseleave', changeItemAuto);
}

// Para a troca automática dos slides.
function stopSlider() {
	clearInterval(timeSlider);
}


// Troca Item.
function changeItem(activeItem) {
	activeItem = $('.popular-posts__item-description.active').index();

	activeItem = activeItem >= totalItem - 1 ? 0 : activeItem + 1;

	$itemNav.eq(activeItem).addClass('active');
	$itemNav.eq(activeItem - 1).removeClass('active');

	$boxTitle.eq(activeItem).addClass('active');
	$boxTitle.eq(activeItem - 1).removeClass('active');
}


// Troca o conteúdo dos Itens de 5 em 5 segundos.
function changeItemAuto() {
	timeSlider = window.setInterval(changeItem, 5000);
}


// Troca Item no hover.
function changeItemHover() {
	var $this 		= $(this),
		indexThis 	= $this.index() -1;

	stopSlider();

	$itemNav.removeClass('active');
	$boxTitle.removeClass('active');
	$this.prev().addClass('active');
	$boxTitle.eq(indexThis).addClass('active');

	changeItem();
}


function sliderMobile() {
	$wrapTitle.slick({
		variableWidth: true,
		centerMode: true,
		dots: false,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1
	});
}



module.exports = {
	init: init
}

},{"../helpers/breakpoint":48}],36:[function(require,module,exports){
var $pressTabsComponent = $('[data-component=press-tabs]'),
	$tabItem 			= $('.imprensa__tabs-item'),
	linkTab 			= $pressTabsComponent.find('.imprensa__tabs-link');

function init() {
	if($pressTabsComponent.length >= 1) {
		handleItem();
		showFilterResults();
		descriptionGuides();

		$breakpoints.initialWindow(768, function() {
			autoHeight();
		}, function() {
			adaptedHeight();
		});

		$breakpoints.resizeWindow(768, function() {
			autoHeight();
		}, function() {
			adaptedHeight();
		});


	}
}



function handleItem(changeEvent) {
	linkTab.on('click', function(e) {
		e.preventDefault();

		var $this 			= $(this),
			linkTarget 		= $this.attr('href'),
			prevItemActive 	= $('.imprensa__tabs-item--active').find('.imprensa__tabs-link').attr('href').split('#'),
			listClass 		= $('.imprensa__results-wrapper').attr('class').replace(prevItemActive[1], linkTarget.replace('#', '')),
			equalItem 		= $this.parent().hasClass('imprensa__tabs-item--active'),
			windowWidth 	= $(window).width();


		if(equalItem || linkTarget === '#press-filter-results' || linkTarget === '#trade-filter-results') return;

		$pressTabsComponent.removeClass('imprensa__tabs--filter-results');

		// Troca classe modificadora para a classe da área selecionada.
		$('.imprensa__results-wrapper').attr('class', listClass);

		// Ativa item do menu
		$tabItem.removeClass('imprensa__tabs-item--active');
		$this.parent().addClass('imprensa__tabs-item--active');

		if(windowWidth >= 768) {
			adaptedHeight();

			$('.imprensa__results').fadeOut(500);
			$(linkTarget).fadeIn(500);
		}
		else {
			$('.imprensa__results').slideUp(500);
			$(linkTarget).slideDown(500, function() {
				var itemPosition = $('.imprensa__tabs-item--active').offset();

				$('html, body').stop(true, true).animate({scrollTop: itemPosition.top}, 1000);
			});
		}
	});
}


function adaptedHeight() {
	autoHeight();
	var blockHeight = $('.imprensa__tabs-item--active').find('.imprensa__results').outerHeight();
	$('.imprensa__results-wrapper').height(blockHeight);
	// $('.imprensa__results').height(blockHeight);
}


function autoHeight() {
	$('.imprensa__results-wrapper, .imprensa__results').height('auto');
}


function descriptionGuides() {
	$('.imprensa__description-guides-close').on('click', function(event) {
		event.preventDefault();

		$(this).parents('.imprensa__description-guides').slideUp(500, function() {
			adaptedHeight();
		});
	});
}


// Remover quando for aplicar filtros e paginação.
// Serve somente para mostrar a página estática p/ o QA
// validar antes da integração.
function showFilterResults() {
	if(!$('.imprensa__tabs-item--filter-results').hasClass('imprensa__tabs-item--active')) return;

	$pressTabsComponent.addClass('imprensa__tabs--filter-results');
	$('.imprensa__results--press-release').css('display', 'none');
	$('.imprensa__results--press-filter-results, .imprensa__results--trade-filter-results').css('display', 'block');
}



module.exports = {
	init: init,
	tabHeight: adaptedHeight
}

},{}],37:[function(require,module,exports){
var $regionMap = $('[data-component="region-map"]');
var $customCombo = $regionMap.find('[data-component="custom-combo"]');
var $customComboJs = require('./combo-box');

function init(region, place) {
	var reginTranslate;

	region = $regionMap.data('region');
	place = 'BR-' + $regionMap.data('place');

	if($regionMap.length >= 1) {
		if(typeof region !== 'string') return;

		handleComboSelect();
		changeRegion(region);
		handleMapChange(new selectMapRegions(region), place);
		insertPin(region, place);

		// Adiciona nome da região no combo.
		$regionMap.find('.custom-combo__options-item').each(function(){
			var $this 		= $(this),
				regionCombo = $this.data('region'),
				regionText 	= $this.text();

			if(region === regionCombo) reginTranslate = regionText;
		})

		$customComboJs.insertText($regionMap.find('.custom-combo__options-item.active'), reginTranslate);
	}
}

function handleComboSelect() {

	if ($customCombo.lenght < 1) return;

	$customCombo.find('.custom-combo__options-item').on('click', function() {
		var dataRegion = $(this).data('region');
		var region = new selectMapRegions(dataRegion);

		changeRegion(dataRegion)
		handleMapChange(region);

		$('.region-map__initial, .region-map__place').css({
			'display':'none'
		})
	})
}

function insertPin(region, place) {
	var $map = new selectMapRegions(region).Region[0];

	var j = $.grep($map.states, function(n, i) {
		return n.id === place;
	});

	if(j.length < 1) { console.log('State does not exist in region'); return }

		$('#'+place).attr('fill', '#fff83f');
		$('#'+region).prepend('<span class="region-map__map-pin region-map__map-pin--'+place+'"></span>')
}

function changeRegion(region) {
	$('.region-map__map-svg').hide();
	$('#'+region).show();
}

function selectMapRegions(region) {
	var Regions = [
		{
			"region" : "north",
			"map": "",
			"states": [
				{
					"id": "BR-AC",
					"uf": "Ac",
					"name": "Acre"
				},
				{
					"id": "BR-AM",
					"uf": "Am",
					"name": "Amazonas"
				},
				{
					"id": "BR-AP",
					"uf": "Ap",
					"name": "Amapá"
				},
				{
					"id": "BR-PA",
					"uf": "Pa",
					"name": "Pará"
				},
				{
					"id": "BR-RO",
					"uf": "Ro",
					"name": "Rondônia"
				},
				{
					"id": "BR-RR",
					"uf": "Rr",
					"name": "Roraima"
				},
				{
					"id": "BR-TO",
					"uf": "To",
					"name": "Tocantins"
				}
			]
		},
		{
			"region" : "northeast",
			"map": "",
			"states": [
				{
					"id": "BR-AL",
					"uf": "Al",
					"name": "Alagoas"
				},
				{
					"id": "BR-BA",
					"uf": "Ba",
					"name": "Bahia"
				},
				{
					"id": "BR-CE",
					"uf": "Ce",
					"name": "Ceará"
				},
				{
					"id": "BR-MA",
					"uf": "Ma",
					"name": "Maranhão"
				},
				{
					"id": "BR-PB",
					"uf": "Pb",
					"name": "Paraíba"
				},
				{
					"id": "BR-PE",
					"uf": "Pe",
					"name": "Pernambuco"
				},
				{
					"id": "BR-PI",
					"uf": "Pi",
					"name": "Piauí"
				},
				{
					"id": "BR-RN",
					"uf": "Rn",
					"name": "Rio Grande do Norte"
				},
				{
					"id": "BR-SE",
					"uf": "Se",
					"name": "Sergipe"
				}
			]
		},
		{
			"region" : "west_central",
			"map": "",
			"states": [
				{
					"id": "BR-DF",
					"uf": "Df",
					"name": "Distrito Federal"
				},
				{
					"id": "BR-GO",
					"uf": "Go",
					"name": "Goiás"
				},
				{
					"id": "BR-MS",
					"uf": "Ms",
					"name": "Mato Grosso do Sul"
				},
				{
					"id": "BR-MT",
					"uf": "Mt",
					"name": "Mato Grosso"
				}
			]
		},
		{
			"region" : "south",
			"map": "",
			"states": [
				{
					"id": "BR-PR",
					"uf": "Pr",
					"name": "Paraná"
				},
				{
					"id": "BR-RS",
					"uf": "Rs",
					"name": "Rio Grande do Sul"
				},
				{
					"id": "BR-SC",
					"uf": "Sc",
					"name": "Santa Catarina"
				}
			]
		},
		{
			"region" : "southeast",
			"map": "",
			"states": [
				{
					"id": "BR-RJ",
					"uf": "Rj",
					"name": "Rio de Janeiro"
				},
				{
					"id": "BR-ES",
					"uf": "Es",
					"name": "Espirito Santo"
				},
				{
					"id": "BR-SP",
					"uf": "Sp",
					"name": "São Paulo"
				},
				{
					"id": "BR-MG",
					"uf": "Mg",
					"name": "Minas Gerais"
				}
			]
		}
	]

	selectMapRegions.prototype.Region = $.grep(Regions, function(n, i) {
		return n.region === region;
	});
}

function handleMapChange(map, path) {
	var $map = map.Region[0];
	var $id = $map.region;
	var $name = $('#region-name span');
	var $uf = $('#region-uf');
	var $url = $('#state-url');

	if(path) setRegion(path);

	$('#'+$id).find('path').on('click', function(e) {
		e.preventDefault();
		$(this).attr('fill', '#fff83f').siblings().attr('fill', '#88d3df');
		setRegion($(this).attr('id'));
	});

	function setRegion(path) {
		var j = $.grep($map.states, function(n, i) {
			return n.id === path;
		});

		if(j.length < 1) return;
			var _slug = $url.data('statelinkprefix')+removeAcento(j[0].name.toLowerCase().replace(/ /g, '-'));
			$name.html(j[0].name);
			$uf.html(j[0].uf);
			$url.attr('href', _slug);

			$('.region-map__initial, .region-map__place').css({
				'display':'block'
			})
	}

	function removeAcento(text)
	{
		text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
		text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
		text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
		text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
		text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
		text = text.replace(new RegExp('[Ç]','gi'), 'c');
		return text;
	}
}

module.exports = {
	init: init
}

},{"./combo-box":12}],38:[function(require,module,exports){
var $relatedLinksFixed = $('.related-links--fixed');
var $breakpoints = require('../helpers/breakpoint');

function init() {
	if($relatedLinksFixed.length >= 1) {

		// No carregamento da página.
		$breakpoints.initialWindow(1208, function() {
			$relatedLinksFixed.removeClass("active");
		}, function(){
			fixedBox();
		});

		// No resize do browser.
		$breakpoints.resizeWindow(1208, function() {
			$relatedLinksFixed.removeClass("active");
		}, function(){
			_h_end = $(dataEnd).innerHeight();
			_t_end = $(dataEnd).position().top;
			_h_this = $relatedLinksFixed.innerHeight();
			_t_parent = parseInt(relatedLinksFixed.parent().css('top'));

			fixedBox();
		});

	}
}

function fixedBox() {
	var dataEnd = $relatedLinksFixed.data('end');

	$(window).scroll(function () {
		if($(window).width() < 1208) return false;

		var _h_end = $(dataEnd).outerHeight(true);
		var _t_end = $(dataEnd).position().top;
		var _h_this = $relatedLinksFixed.outerHeight(true);
		var _t_parent = parseInt($relatedLinksFixed.parent().css('top'));
		calc_scroll_bottom = (_h_end + _t_end) - _t_parent;

		if($(this).scrollTop() > 850 && $(this).scrollTop() <= calc_scroll_bottom) {
			$relatedLinksFixed.addClass("active");
			$relatedLinksFixed.attr('style', '');
		} else if ($(this).scrollTop() > calc_scroll_bottom) {
			$relatedLinksFixed.css({
				position: 'absolute',
				top: (_h_end - (_h_this + _t_parent + 100)) +'px'
			});
		} else {
			$relatedLinksFixed.removeClass("active");
		}
	});
}

module.exports = {
	init: init
}

},{"../helpers/breakpoint":48}],39:[function(require,module,exports){
var $scrollTo = $('[data-component="scrollTo"]');

function init() {
	scrollTo();
}

function scrollTo() {
	var $obj = ($scrollTo.data('to'))? $scrollTo.data('to') : $scrollTo.attr('href');
	var $offset = parseInt(($scrollTo.data('offset')) ? $scrollTo.data('offset') : 0);
	$scrollTo.click(function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($obj).offset().top + $offset
		}, 1000);
	})
}


module.exports = {
	init: init
}

},{}],40:[function(require,module,exports){
var $listChoose = $('[data-component="search-list"]');

function init() {
	if($listChoose.length >= 1) {
		hadleListView();
		handleCheckboxSelect();
	}
}


function hadleListView() {

	$buttonsChoose = $('.search-list__button');
	$wrapperList = $('.search-list__wrapper');

	$buttonsChoose.on('click', function() {

		if( checkIsActive( $(this) ) ){
			wrapperClose($(this).data('target'));
			$(this).removeClass('active');
		}  else {
			$buttonsChoose.removeClass('active');
			$wrapperList.hide();
			wrapperOpen($(this).data('target'));
			$(this).addClass('active');
		}

	});


	$('#interests .btn-simple', $listChoose).click(function() {
		$('.search-list__text .search-list__button', $listChoose).removeClass('active');
		$('.search-list__text .search-list__button[data-target="activity"]', $listChoose).addClass('active');

		wrapperClose('interests');
		wrapperOpen('activity');
		$("html, body").stop().animate({
			scrollTop: $listChoose.position().top - 70
		}, 600);
	});

	$('#activity .btn-simple', $listChoose).click(function() {
		$('.search-list__text .search-list__button', $listChoose).removeClass('active');

		wrapperClose('activity');
		$("html, body").stop().animate({
			scrollTop: $listChoose.position().top + 22
		}, 600);
	});

	function checkIsActive(el) {
		return el.hasClass('active') ? true : false;
	}

	function wrapperOpen(el) {
		$('#'+el).show();
	}

	function wrapperClose(el) {
		$('#'+el).hide();
	}
}

function handleCheckboxSelect() {
	var $selectAll = $('.search-list__select-all');

	$selectAll.on('click', function(e) {

		var $checkboxes = $(this).parents('.search-list__wrapper').find(':checkbox'),
			targetCat   = $(this).parents('.search-list__wrapper').attr('id'),
			checked     = $(this).parents('.search-list__wrapper').find(':checkbox:checked');

		if(checked.length == $checkboxes.length) {
			$checkboxes.prop('checked', false);
			$('.search-list__button[data-target="' + targetCat + '"]').find('strong').html('').parent().find('span').removeClass('active').parent().find('span.singular').addClass('active');
		} else {
			$checkboxes.prop('checked', true);
			$('.search-list__button[data-target="' + targetCat + '"]').find('strong').html($checkboxes.length).parent().find('span').removeClass('active').parent().find('span.plural').addClass('active');
		}

		e.preventDefault();
	})
}

module.exports = {
	init: init
}

},{}],41:[function(require,module,exports){
var $searchComponent = $('[data-component=search]');
var $traducaoData = {};

function init() {
	var lang = document.documentElement.lang.toUpperCase().substring(0,2).toLowerCase();
	var traducaoUrl = SETTINGS.SERVICES + '/json/translate/?language='+lang;

	$.ajax({
		url: traducaoUrl,
		dataType: 'json',
		method: 'GET',
		crossDomain: true,
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		success: function(response) {
			$traducaoData = response;
			var $breakpoints = require('../helpers/breakpoint');
			var $searchFilter = handleSearchFilter();

			$breakpoints.resizeWindow(1200, function() {
				$searchFilter.on();
			}, function(){
				$searchFilter.off();
			});

			$breakpoints.initialWindow(1200, function() {
				$searchFilter.on();
			}, function(){
				$searchFilter.off();
			});

			handleTopBarFix();
			handleAutocomplete();
			handleExitBlur();
			bindButtonSearch();
			closeSearchModal();
			handleSearchTriggers();

			$('.search-filter__list-item:first input[type=checkbox]').click(handleFilterSelectAll);
		}
	})
}

function handleFilterSelectAll(){
	var parentTd = $(".search-filter__list").first();
	var checkboxes = parentTd.find("input[type=checkbox]");
	var check = $(this).is(":checked");

	checkboxes.prop("checked", check);

}

function handleSearchFilter() {
	var $searchFilter = $('.search-filter');
	var $searchFilterWrapper = $searchFilter.find('.search-filter__wrapper');
	var $searchFilterButton = $searchFilter.find('.search-filter__button');

	var turnOnClick = function() {
		$searchFilterButton.off('click');
		$searchFilterButton.on('click', function(e) {
			e.preventDefault();
			$searchFilter.toggleClass('hide');
		})
	}

	var turnOffClick = function() {
		$searchFilterButton.off('click');
	}

	return {
		on: turnOnClick,
		off: turnOffClick
	}
}

function cleanSearch() {
	// handleFilterSelectAll();
	$('.search__results').html('');
	$('.search__autocomplete').addClass('hidden');
	$('#search-input').val('');
	$('.search-list__results-pagination').addClass('hidden');
}

function handleTopBarFix() {

	var num = 0;
	var $headerFix = $('.search__top-wrapper');

	$('.search-wrap').on('scroll', function() {
		$('.search-wrap').scrollTop() > 270 ? appendWrapper() : removeWrapper();

		var $scrollOffset = $(window).scrollTop() + $headerFix.height();
		var $i = -1;
		var $categories = joinCategories() || false;

		if(!$categories) return;
			$('[data-categorie]').each(function() {
				if( $scrollOffset >= $(this).offset().top) { $i++; }
			});

			if(num != $i || $i == 0) {
				num = $i;

				if(typeof $categories[$i] !== 'undefined') {
					if(wrapperExistance()){
						$headerFix.find('.search__categorie-title').remove();
						cloneToFix([ $categories[$i].find('.search__categorie-title') ])
					}
				}
			}
	});

	function appendWrapper() {
		if( !wrapperExistance() ) {
			$headerFix.addClass('fixed');
		}
	}

	function removeWrapper() {
		if( wrapperExistance() ) {
			$headerFix.removeClass('fixed');
			$headerFix.find('.search__categorie-title').remove(); // remove o titulo da categoria do header fixo
		}
	}

	// Reúne as 'categorias' encontradas em um array, para poderem se adicionadas no header reduzido
	function joinCategories() {
		var $categories = [];

		if($('[data-categorie]').length < 1) return;
			$('[data-categorie]').each(function() {
				$categories.push($(this));
			})

		return $categories;
	}

	// Verifica se o wrapper para o header reduzido existe
	function wrapperExistance() {
		return $headerFix.hasClass('fixed');
	}

	// Clona os htmls que serão usados no header reduzidos
	function cloneToFix(elements) {
		for( var e in elements ) {
			elements[e].clone().appendTo('.search__top-wrapper');
		}
	}
}

function handleAutocomplete() {
	var $input = $('#search-input');

	//chama o fitro de resutado de busca conforme os eventos
	$input.on('keyup', filterSearch);

	$('.search-wrap').click(function(){
		if($('.search__autocomplete').is(':visible')){
			$('.search__autocomplete').html('');
			doSearch($input.val(), '', 0);
		}
	});

	$(".search-filter__list-item input[type='checkbox']").on('change', function() {
		$('.search__autocomplete').hide();
		var modules = getModules();
		doSearch($input.val(), modules, 0);

	});

	// chama o json e filtra conforme a devem ser mostratadas a sugestões no site
	function filterSearch(evt){

		var module = getModules();

		var q = $input.val(),
			lang = document.documentElement.lang.toUpperCase().substring(0,2).toLowerCase(),
			searchUrl = SETTINGS.SERVICES+'/json/search/?q=' + q +'&'+ module + '&group=true'+ '&rows=6'+'&language='+lang;


		substrRegex = new RegExp(q, 'i');

		if(q.length > 2 ){
			window.setTimeout(function() {


				$.ajax({
					url: searchUrl,
					dataType: 'json',
					method: 'GET',
					crossDomain: true,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					success: function(response) {
						var result = response.result,
							matches = [],
							groups = [];


						$.each(result, function(idx, val){


							if(idx == 'groups'){

								groups = val;

								$.each(groups, function(a,b){

									var docs = b['doclist']['docs'];

									$.map(docs, function(n,i){
										if (substrRegex.test(n.title, i)) {
											matches.push( { value: n.title, parent: n.module, link: n.cache } );
										}
									});
								});
							}
						});
						handleResult(matches, $input, q, lang);
					}
				})

			}, 500);
		}else {
			_remove();
		}
	}

	//insere as sugetões no html
	var handleResult = function (output, el, q, lang) {
		_remove();
		$.each(output, function(i, n) {
			$('.search__autocomplete').removeClass('hidden');
			$('.search__autocomplete').append('<div class="search__autocomplete-text" onclick="completeInput(\''+n.value+'\', \''+n.link+'\');"><span class="search__autocomplete-term"> '+ _item(n.value, q) +'</span> <span class="search__autocomplete-categorie">'+$traducaoData.in+' <strong>'+ $traducaoData[n.parent] +'</strong><span></div>');
		})
	}

	window.completeInput = function(val, link) {

		if(link.length > 0) {
			location.href = link;
		}

		$('#exit').fadeOut();
		_remove();
		cleanSearch();
	}

	// remove as divs de sugestão de busca
	var _remove = function() {
		if($('.search__autocomplete-text').length > 0) {
			$('.search__autocomplete-text').remove();
			$('.search__autocomplete').addClass('hidden');
		}
	}

	// marca o texto de acordo com o caracter inputado
	var _item = function (text, input) {
		var html = input.trim() === '' ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
		return html;
	};

	$.regExpEscape = function (s) {
		return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
	};
}

function getModules() {
	module = [];
	if(!$(".search-filter__list-item:first input[type='checkbox']").is(':checked')){
		var filterSelectedOptions = $(".search-filter__list-item input[type='checkbox']:checked");
		$.each(filterSelectedOptions, function(a,b){
			switch(b.value){
				case 'Attractions':
					module.push("atracoes");
					break;
				case 'Destinations':
					module.push("destinos");
					break;
				case 'Regions':
					module.push("regioes");
					break;
				case 'Experiences':
					module.push("experiencias");
					break;
				case 'Blog':
					module.push("blog");
					break;
			}
		});
	}
	if(module.length > 0)
		return "modules="+module.join();
	else
		return "modules=";
}

function handleExitBlur() {
	var $input = $('#search-input'),
		$btnExit = $('#exit');

	var $formSize = function() {
		return parseInt($input.css('fontSize'), 10);
	}

	$input.on('keyup', function(e) {
		if( $(this).val().length === 0 && e.type != 'keypress' ) {
			closeInput();
		}
		else {
			$btnExit.css({
				'left': ($(this).val().length+1) * ($formSize() / 2)
			});
			$btnExit.fadeIn();

			if(parseInt($btnExit.css('left').split('px')[0]) >= 645) {
				$('.search__input-wrapper').addClass('search__input-wrapper--fixed-button');
				$btnExit.css('left', '645px');
			}
			else {
				$('.search__input-wrapper').removeClass('search__input-wrapper--fixed-button');

			}
		}
	})

	$('#exit').on('click', function(e) {
		$input.val('');
		closeInput();
		cleanSearch();

		return false;
	})

	function closeInput() {
		$('#exit').fadeOut();
		$('#exit').css('left', 0)
		$('.search__results-founded').hide();
		$('.search__results-founded, .search__searched-terms').hide();
	}
}

function bindButtonSearch() {
	var $buttonclick = $('[data-search--click]');

	if($buttonclick.length < 1) return;

	$buttonclick.each(function(e) {
		$(this).on('click', function(e){
			e.preventDefault();

			// Traz o chekbox do filtro marcado quando passado
			// o atributo data-filter="lorem" no botão que abre a busca.
			var filter = $(this).data('filter');
			$('#' + filter).trigger('click');

			openSearchModal();
		})
	});
}

function openSearchModal() {
	$('body').css('overflow', 'hidden').scrollTop(0);
	$('.search').fadeIn();
}

function closeSearchModal() {

	$('.search__close-btn').on('click', function() {
		$('body').css('overflow', 'inherit');
		$('.search').fadeOut();
		cleanSearch();
		$('#exit').click();
	});
}

function handleSearchTriggers() {
	var btnSubmit = $('.search__input-icon-search'),
		inputSearch = $('#search-input');

	btnSubmit.click(function(){

		var q = inputSearch.val();
		if(q.length >= 2){
			doSearch(q, '', 0);
			$('.search__autocomplete').hide();

		}
	});


}

function handlePagination(numero_de_itens, rows){

	var numero_de_paginas = Math.floor(numero_de_itens / rows);

	var link_atual = 1;
	var navegacao = '',
		controls = '',
		interval = "<li class='pagination__list-item pagination__list-item'><a href='#' class='pagination__list-link pagination__list-link--noitem'>...</a></li>",
		endPages = (numero_de_paginas <= 11)? numero_de_paginas : 11;

	while (link_atual <= numero_de_paginas) {

		if(link_atual <= endPages) {
			navegacao += "<li class='pagination__list-item'><a class='page pagination__list-link'  longdesc='" + link_atual + "' >" + link_atual + "</a></li>";
		}

		if(link_atual > endPages && link_atual < numero_de_paginas){
			navegacao += "<li class='pagination__list-item hidden'><a class='page pagination__list-link' longdesc='"+ link_atual +"' >" + link_atual +"</a></li>";
		}

		if(link_atual == numero_de_paginas && endPages < numero_de_paginas){
			navegacao += interval + "<li class='pagination__list-item '><a class='page pagination__list-link' longdesc='"+ link_atual +"' >" + link_atual +"</a></li>";
		}

		link_atual++;
	}

	controls += "<button type='button' class='pagination__nav pagination__nav--prev'></button>";
	controls += "<button type='button' class='pagination__nav pagination__nav--next'></button>";



	//colocamos a navegação dentro da div class controls
	$(".pagination__list").html(navegacao);
	$(".pagination__nav").remove();
	$(".pagination").prepend(controls);

	$('.pagination__pages-current').html(1);
	$('.pagination__pages-total').html(link_atual);

	$('.pagination__list-link').click(function(){

		$('.pagination__list-link.active').removeClass('active');

		$(this).addClass('active');

		var query = $('#search-input').val(),
			page = $('.pagination__list-link.active').attr('longdesc');
			start = 0,
			modules = '&module=' + $('.search-filter__list-item input[type="checkbox"]:checked').val();

			page = parseInt(page);
			start = (page == 0) ? 1 : (page - 1) * 15;


		$('.pagination__pages-current').html(page);

		doSearch(query, modules, start);
	});

	$('.pagination__nav--prev').click(function(){

		var query = $('#search-input').val(),
			activePage = $('.pagination__list-link.active').attr('longdesc'),
			start = 0,
			page = 0,
			numFound = parseInt($('.search__results-founded strong').text()),
			hideElement = '';

		activePage = parseInt(activePage);
		numFound = parseInt(numFound);

		if(activePage >= 2){
			page = activePage - 1;
			hideElement = page + endPages;
		}

		$('.pagination__list-link.active').removeClass('active');
		$('.pagination__list-link[longdesc="'+ page +'"]').addClass('active').parent().removeClass('hidden');
		$('.pagination__list-link[longdesc="'+ hideElement +'"]').parent().addClass('hidden');

		$('.pagination__pages-current').html(page);

		if (page >= 2) {
			start =  page * 15;
		}


		doSearch(query, '', start);

	});

	$('.pagination__nav--next').click(function(){

		var query = $('#search-input').val(),
			activePage = $('.pagination__list-link.active').attr('longdesc'),
			start = 0,
			page = 0,
			numFound = parseInt($('.search__results-founded strong').text()),
			hideElement = '';

		activePage = parseInt(activePage);
		numFound = parseInt(numFound);

		if(activePage < numero_de_paginas){
			page = activePage + 1;
			start =  page * 15;

			if(activePage >= endPages){
				hideElement = page - endPages;
			}
		}

		$('.pagination__list-link.active').removeClass('active');
		$('.pagination__list-link[longdesc="'+ page +'"]').addClass('active').parent().removeClass('hidden');
		$('.pagination__list-link[longdesc="'+ hideElement +'"]').parent().addClass('hidden');

		$('.pagination__pages-current').html(page);
		doSearch(query, '', start);

	});

}

function handleDoclist(doclist, pointer, category, pagination){
	pointer = pointer || 0;

	var language = document.documentElement.lang.toUpperCase().substring(0,2);
	var numFound = doclist['numFound'];
	var start = doclist['start'];
	var docs = doclist['docs'];
	var html = '';
	var idxStop = 2;
	var traducao = [];


	traducao = {
		'showing': {
			'PT': 'mostrando',
			'EN': 'showing',
			'ES': 'demostración'
		},
		'of': {
			'PT': 'de',
			'EN': 'of',
			'ES': 'de'
		},
		'category': {
			'experiencias': {
				'PT': {
					'traducao': 'experiências',
					'txtBtn': 'Mostrar todas as'
				},
				'EN': {
					'traducao': 'experiences',
					'txtBtn': 'Show all'
				},
				'ES': {
					'traducao': 'experiencias',
					'txtBtn': 'Mostrar todos'
				}
			},
			'blog': {
				'PT': {
					'traducao': 'blog',
					'txtBtn': 'Mostrar todos os'
				},
				'EN': {
					'traducao': 'blog',
					'txtBtn': 'Show all'
				},
				'ES':{
					'traducao': 'blog',
					'txtBtn': 'Mostrar todos'
				}
			},
			'atracoes': {
				'PT': {
					'traducao': 'atrações',
					'txtBtn': 'Mostrar todas as'
				},
				'EN': {
					'traducao': 'attractions',
					'txtBtn': 'Show all'
				},
				'ES': {
					'traducao': 'atracciones',
					'txtBtn': 'Mostrar todas as'
				},

			},
			'destinos': {
				'PT': {
					'traducao': 'destinos',
					'txtBtn': 'Mostrar todos os'
				},
				'EN': {
					'traducao': 'destinations',
					'txtBtn': 'Show all'
				},
				'ES': {
					'traducao': 'destinos',
					'txtBtn': 'Mostrar todos os'
				}
			},
			'regioes': {
				'PT': {
					'traducao': 'regiões',
					'txtBtn': 'Mostrar todas as'
				},
				'EN': {
					'traducao': 'regions',
					'txtBtn': 'Show all'
				},
				'PT': {
					'traducao': 'regiones',
					'txtBtn': 'Mostrar todas as'
				},

			}
		}
	}

	if(pagination){
		idxStop = 14;
	}

	var contador = 0;
	var imprimeBotao = function(indice, idxStop, category, pagination){
		var botao = "<button class='btn-default btn-default--small-blue'>" + traducao.category[category][language]['txtBtn'] + ' ' + traducao.category[category][language]['traducao'] + "</button></div>";
		if(indice == idxStop){
			return botao;
		}

		return '';
	};

	$.each(docs, function(idx, v){
		if(idx === 0){
			html += "<div class='search__categorie' data-categorie='" + category + "'>";
			html +=	"<div class='search__categorie-title'><div class='container'>" + traducao.category[category][language]['traducao'] + "<span>("+traducao.showing[language]+" <strong>"+ pointer +"</strong> "+traducao.of[language]+" <strong>"+ numFound + "</strong>)</span></div></div>";
		}

		html +=	"<a href='"+ v.cache +"' class='search__categorie-wrapper clearfix'>";
		html +=	"<div><img class='search__categorie-photo' src='"+ v.picture_url +"'></div>";
		html +=	"<div class='search__categorie-description'>";
		html +=	"<span>"+ v.title +"</span>";
		html +=	"<blockquote>"+ v.subtitle +"</blockquote></div></a>";

		var fim = docs.length - 1;

		if(contador == fim && !pagination){
			html += "<div id='imprimeBotao'>" 	+ imprimeBotao(contador, idxStop, category, pagination,language) +"</div>";
		}

		contador++;

	});
	return html;
}

function getFilters() {
	var array = $(".search-filter__list-item input[type='checkbox']:checked"),
		newArray = [];

	if(!checkFilterAllSelected()){
		$.each(array, function(a,b){
			newArray.push($(b).val().toLowerCase());
		});
	}

	return newArray;
}

function getFiltersSelectedQtt() {
	var array = getFilters();
	return array.length;
}

function checkFilterAllSelected() {
	return $(".search-filter__list-item:first input[type='checkbox']").is(':checked');
}

function clearFilter() {
	$(".search-filter__list-item input[type='checkbox']").prop('checked', false);
}

function composeSearchQuery(query, module, rows, start) {
	var baseUrl = SETTINGS.SERVICES+'/json/',
		searchUrl = '',
		resultFilterQtt = getFiltersSelectedQtt();

	query = query || '';
	module = getModules();
	rows = rows || 3;
	start = start || 0;

	searchUrl = baseUrl + 'search/?' + module + '&q=' + query + '&rows=' + rows + '&start=' + start;
	//"total":168,"start":20,"rows":5,"nextStart":25,"hasNext":true

	if(resultFilterQtt >= 2 || resultFilterQtt == 0){
		searchUrl = baseUrl + 'search/?' + module + '&q=' + query + '&rows=' + rows;
	}

	return searchUrl;
}

function doSearch(query, modules, start) {

	var filterQtt = getFiltersSelectedQtt(),
		rows = 3,
		pointer = 0,
		filtersSelected = getFilters(),
		searchQuery = '',
		opt = {};


	if(filterQtt == 1){
		rows = 15;
	}

	searchQuery = composeSearchQuery(query, filtersSelected.join(","), rows, start);

	opt = {
		crossOrigin: true,
		dataType: 'json',
		contentType: 'application/json',
		method: 'GET',
		url: searchQuery,
		crossDomain: true,
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		success: function (data) {

			var response = [],
				groups = [],
				matches = 0,
				html = '',
				pagination = false;

			response = data.result;

			if(rows == 15){
				pagination = true;
			}


			if ('totalGroups' in data) {
				groups = response.groups;

				groupQtd = groups.length;
				matches = response.matches;
				pointer = (matches <= 3) ? matches : 3;
				pagination = false;

				$('.pagination__list').html('');
				$('.pagination__nav').remove();

				$.each(groups, function (i, v) {
					var doclist = v.doclist;
					var category = v.groupValue;

					html += handleDoclist(doclist, pointer, category, pagination);
				});

			} else {
				groups = response;
				matches = data.total;
				start = data.start;
				pointer = (start > 0) ? start : rows;
				var doclist = [];

				var category = getFilters();

				doclist["numFound"] = matches;
				doclist["start"] = pointer;
				doclist["docs"] = response;

				html += handleDoclist(doclist, pointer, category, pagination);
			}

			$('.search__results-founded strong').text(matches);
			$('.search__results-founded').show();

			$('.search__results').fadeIn().removeClass('hidden');
			$('.search__results').html(html);

			if(pagination && start == 0 && matches > 0){
				$('.pagination__list').html('');

				handlePagination(matches, rows);

				$('.search-list__results-pagination').removeClass('hidden');
				$('.pagination__list-link:first').addClass('active');
				$('.search__categorie button').remove();
			}

			$('.search__categorie button').click(function(){
				var module = $(this).parent().parent().data('categorie'),
					query = $('#search-input').val();

				id = module.charAt(0).toUpperCase() + module.slice(1);

				clearFilter();

				$('#' + id).prop('checked', true);

				doSearch(query, module, 0, 0);

				$(this).hide();
			});

		},
		error: function (data){
		}
	};

	$.ajax(opt);

}


module.exports = {
	init: init
}

},{"../helpers/breakpoint":48}],42:[function(require,module,exports){
var $shareComponent = $('[data-component=share]'),
	$twitterButton 	= $('.share__item-social--twitter'),
	$facebookButton = $('.share__item-social--facebook'),
	$gogleButton 	= $('.share__item-social--plus');


function init() {
	if($shareComponent.length >= 1) {
		handleTwitterSharing();
		handleFacebookSharing();
		handleGoogleSharing();
	}
}



function handleTwitterSharing() {
	$twitterButton.on('click', function(e) {
		e.preventDefault();

		var textShare = $(this).attr('data-textShare');

		openPopup('https://twitter.com/share?text=' + textShare, 600, 300);
	})
}


function handleFacebookSharing() {
	$facebookButton.on('click', function(e) {
		e.preventDefault();

		openPopup('http://www.facebook.com/sharer.php?u='+window.location.href, 600, 300);
	})
}


function handleGoogleSharing() {
	$gogleButton.on('click', function(e) {
		e.preventDefault();

		openPopup('https://plus.google.com/share?url='+window.location.href, 600, 300);
	})
}


function openPopup(url, popWidth, popHeight) {

	var settings = {
		screenY: (window.screen.height / 2) - ((popHeight / 2) + 50),
		screenX: (window.screen.width / 2) - ((popWidth / 2) + 10),
		height: popHeight,
		width: popWidth
	}

	window.open(
		url,
		'',
		"status=no," +
		"height="+ settings.height + ',' +
		"width="+ settings.width + ',' +
		"screenX="+ settings.screenX + ',' +
		"screenY="+ settings.screenY + ',' +
		",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no"
	)
}



module.exports = {
	init: init
}


},{}],43:[function(require,module,exports){
var $href = $('a[href]');

function init() {
	targetUrl();
}

function targetUrl() {
	// SETTINGS.SERVICES
	$href.each(function(i, item) {
		if(typeof SETTINGS.SERVICES !== 'undefined') {
			var _href = $(item).attr('href'),
					_compareUrl = SETTINGS.SERVICES.replace(/^[^.]+\./g, "");

			if(_href != '#' && _href != '#this' && _href != '') {
				if(_href.indexOf(_compareUrl) != -1) {
					$(item).attr('target', '_self');
				} else {
					$(item).attr('target', '_blank');
				}
			}
		}
	});
}


module.exports = {
	init: init
}

},{}],44:[function(require,module,exports){
var $userComponent = $('[data-component=user]');

function init() {
	toggleUser();
}

function toggleUser() {
	$userComponent.find('.user__button').on('click', function() {
		var $this = $(this);

		$this.parent('[data-component=user]').toggleClass('user--open');
	});

	$userComponent.find('.user__list-item-link').on('click', function() {
		var $this = $(this);

		$userComponent.removeClass('user--open');
	});
}

module.exports = {
	init: init
}

},{}],45:[function(require,module,exports){
var $weatherComponent = $('[data-component=weather]');
var $weatherScaleComponent = $('[data-component=weather-scale]');
var tempData = {};

function init() {
	if($weatherComponent.length >= 1) {
		handleScale();
		handleWeatherSmall();
		handleTempData();
	}
}

function handleTempData(){
	$.ajax({
		url:SETTINGS.SERVICES+'/json/weather/?key='+$weatherComponent.data('key'),
		type:'GET',
		dataType:'json'
	}).then(function(response){
		if(response)
		{
			tempData = response;
			$('.weather__degree-number.weather__degree-number--now').html(response.celsius_max + 'ºc');
			$('.weather__degree-number.weather__degree-number--average.celsius')
				.html(response.celsius_max + "<span>ºC</span>");

			$('.weather__degree-number.weather__degree-number--low.celsius')
				.html(response.celsius_min + "<span>ºC</span>");

			$('.weather__degree-number.weather__degree-number--average.fahrenheit')
				.html(response.fahrenheit_max + "<span>ºF</span>");

			$('.weather__degree-number.weather__degree-number--low.fahrenheit')
				.html(response.fahrenheit_min + "<span>ºF</span>");

		}else{
			$weatherComponent.hide();
		}
	})
}

function handleScale() {
	var $key = $weatherScaleComponent.find('.weather__scale-switch-text');

	$key.on('click', function(e) {
		e.preventDefault();


		if( !$(this).hasClass('active') ) {
			$(this).addClass('active').siblings().removeClass('active');
		}


		$('.weather__degree > span.weather__degree-number.'+$(this).data('type')).show().siblings('.weather__degree-number').hide();
		if($(this).data('type') == "celsius") {
			$('.weather__degree-number.weather__degree-number--now').html(tempData[$(this).data('type')+"_max"] + 'ºc');
		}else {
			$('.weather__degree-number.weather__degree-number--now').html(tempData[$(this).data('type')+"_max"] + 'ºf');
		}


	});

	$key.first().trigger('click');
}

function handleWeatherSmall() {

	if($('.weather--small').length < 1) return;

	var $weatherButton = $('.weather--small__button');
	var $wrapper = $('.weather__wrapper');

	$weatherButton.on('click', function() {
		$(this).next().toggleClass('active');
		$(this).find('.weather--small__button-inside').toggleClass('active');
	});


}

module.exports = {
	init: init
}

},{}],46:[function(require,module,exports){
module.exports = {
	url: {
		map: {
			"home-map": "/files/mocks/home-map.json",
			"exemplo": "/files/mocks/exemplo-componente.json",
			"attractions": "/files/mocks/map-attractions.json",
			"destino-home": "/files/mocks/map-destino-home.json",
			"destino": "/files/mocks/map-destino.json",
			"atividade": "/files/mocks/map-atividade.json",
			"atividade-brasil": "/files/mocks/map-atividade-brasil.json",
			"regioes": "/files/mocks/map-regiao.json",
			"eventos": "/files/mocks/map-eventos.json",
			"experiencias": "/files/mocks/map-experiencia.json"
		}
	},

	tokenMap: 'pk.eyJ1IjoiaXNvYmFyIiwiYSI6ImNpbGNvMWY5eDM5bnZ0dWx4dGVlOW0weGIifQ.vfMuv0PrQ7i5RIv6UtH3jw'
}

},{}],47:[function(require,module,exports){
var $header = $('#header');

function init() {
	blockHeaderScroll();
	translates();
}


function translates(){
	$.getJSON(SETTINGS.SERVICES + '/json/translate/',{
			language:document.documentElement.lang.toUpperCase().substring(0,2).toLowerCase(),
			content:true
	})
	.then(function(response){
		if(response != ""){
			window.translates = response;
		}
	})
}

// Trava Header no scroll
function blockHeaderScroll() {
	$(window).scroll(function () {
		if($(window).width() < 1208) return false;

		if ($(this).scrollTop() > 56) {
			$('body').addClass('header__fixed--active')
			$header.addClass("header--fixed");
		} else {
			$('body').removeClass('header__fixed--active')
			$header.removeClass("header--fixed");
		}
	});
}

module.exports = {
	init: init
}

},{}],48:[function(require,module,exports){
"use strict";

function breakpoints(){

	var _public = {};


	// No resize do browser, ele verifica a largura
	// e se for menor que o valor estipulado, ele executa
	// o que for retornado no callback.
	_public.resizeWindow = function resizeWindow(breakpoint, callback1, callback2){

		var timeDebounce = 500;

		jQuery(window).bind('resize', function() {
			var windowWidth = jQuery(window).width();

			if(windowWidth < breakpoint) {
				callback1();
			}
			else {
				callback2();
			}
		}.debounce(timeDebounce));

	};


	// Verifica a largura da janela do browser e
	// executa o que for retornado no callback.
	_public.initialWindow = function initialWindow(breakpoint, callback1, callback2) {
		var windowWidth = jQuery(window).width();

		if(windowWidth < breakpoint) {
			callback1();
		}
		else {
			callback2();
		}
	};


	return _public;

}

module.exports = breakpoints();

},{}],49:[function(require,module,exports){
(function($) {
	window.App = {};
	$(document).ready(function() {

		window.App.Modules = {
			header: require('./inc/header'),
			config: require('./inc/config'),
			menuHamburguer: require('./inc/components/menu-hamburguer'),
			languages: require('./inc/components/languages'),
			user: require('./inc/components/user'),
			map: require('./inc/components/mapbox'),
			fullMap: require('./inc/components/full-map'),
			search: require('./inc/components/search'),
			favorite: require('./inc/components/favorite'),
			newsletter: require('./inc/components/newsletter'),
			share: require('./inc/components/share'),
			addFavorite: require('./inc/components/add-favorite'),
			weather: require('./inc/components/weather'),
			comboBox: require('./inc/components/combo-box'),
			regionMap: require('./inc/components/region-map'),
			alertGlobal: require('./inc/components/alert-global'),
			destaque: require('./inc/components/destaque'),
			alerts: require('./inc/components/alerts'),
			searchList: require('./inc/components/search-list'),
			cardsPagination: require('./inc/components/cards-pagination'),
			// form: require('./inc/components/contact-form'),
			basicTooltip: require('./inc/components/basic-tooltip'),
			cardTooltip: require('./inc/components/card-tooltip'),
			countDown: require('./inc/components/count-down'),
			gallery: require('./inc/components/gallery'),
			customInputDate: require('./inc/components/custom-input-date'),
			popularPosts: require('./inc/components/popular-posts'),
			experienciaNav: require('./inc/components/experiencia-nav'),
			contextualNav: require('./inc/components/contextual-nav'),
			breadcrumb: require('./inc/components/breadcrumb'),
			relatedLinks: require('./inc/components/related-links'),
			comboChangeContent: require('./inc/components/combo-change-content'),
			// contactPress: require('./inc/components/contact-press'),
			pressTabs: require('./inc/components/press-tabs'),
			// miceContact: require('./inc/components/mice-contact'),
			// miceForgotPassword: require('./inc/components/mice-forgot-password'),
			boxMsgError: require('./inc/components/box-msg-error'),
			// tradeRegister: require('./inc/components/trade-register'),
			tradeRegister: require('./inc/components/accordeon'),
			currencyConverter: require('./inc/components/currency-converter'),
			flightMap: require('./inc/components/flight-map'),
			displayEvents: require('./inc/components/display-events'),
			cardsLimitation: require('./inc/components/cards-limitation'),
			destination:   require('./inc/components/destination.js'),
			scrollTo:      require('./inc/components/scrollTo.js'),
			modal:      require('./inc/components/modal.js'),
			loadmore: 	   require('./inc/components/loadMore.js'),
			mapAtividade:  require('./inc/components/map-atividade.js'),
			urlTarget:  require('./inc/components/url-target.js'),
			jqueryMask: require('./inc/components/jquery-mask.js'),
			debounce:  require('./inc/components/debounce.js'),
			// translates: require('./inc/components/translate.js'),
			translate: require('./inc/components/alerta-verao.js')
		};

		// Inicializa os modulos que forem inicializaveis
		for(var module in App.Modules) {
			if(typeof App.Modules[module].init == "function") {
				App.Modules[module].init();
			}
		}
	});
})(jQuery)

},{"./inc/components/accordeon":1,"./inc/components/add-favorite":2,"./inc/components/alert-global":3,"./inc/components/alerta-verao.js":4,"./inc/components/alerts":5,"./inc/components/basic-tooltip":6,"./inc/components/box-msg-error":7,"./inc/components/breadcrumb":8,"./inc/components/card-tooltip":9,"./inc/components/cards-limitation":10,"./inc/components/cards-pagination":11,"./inc/components/combo-box":12,"./inc/components/combo-change-content":13,"./inc/components/contextual-nav":14,"./inc/components/count-down":15,"./inc/components/currency-converter":16,"./inc/components/custom-input-date":17,"./inc/components/debounce.js":18,"./inc/components/destaque":19,"./inc/components/destination.js":20,"./inc/components/display-events":21,"./inc/components/experiencia-nav":22,"./inc/components/favorite":23,"./inc/components/flight-map":24,"./inc/components/full-map":25,"./inc/components/gallery":26,"./inc/components/jquery-mask.js":27,"./inc/components/languages":28,"./inc/components/loadMore.js":29,"./inc/components/map-atividade.js":30,"./inc/components/mapbox":31,"./inc/components/menu-hamburguer":32,"./inc/components/modal.js":33,"./inc/components/newsletter":34,"./inc/components/popular-posts":35,"./inc/components/press-tabs":36,"./inc/components/region-map":37,"./inc/components/related-links":38,"./inc/components/scrollTo.js":39,"./inc/components/search":41,"./inc/components/search-list":40,"./inc/components/share":42,"./inc/components/url-target.js":43,"./inc/components/user":44,"./inc/components/weather":45,"./inc/config":46,"./inc/header":47}]},{},[49]);
