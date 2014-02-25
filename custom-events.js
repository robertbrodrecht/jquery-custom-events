/**
 * Custom jQuery Events
 *
 * @since   	Version 1.0
 */
(function($, window, undefined) {
	'use strict';

	var customEvents = ['scrollStart', 'scrollEnd', 'resizeStart', 'resizeEnd'],
		timeoutResize = 250,
		timeoutScroll = 250;
	
	$.event.special.scrollStart = {
		enabled: true,
		setup: function() {
			var me = this,
				jqme = $(me),
				timer;
			
			function trigger() {
				$.event.dispatch.call(me, 'scrollStart');
			}
			
			if(typeof jqme.data('track-scroll') === 'undefined') {
				jqme.data('track-scroll-start', false);
			}
			
			jqme.bind('touchmove.scrollstart scroll.scrollstart', function() {
				if(!jqme.data('track-scroll-start')) {
					jqme.data('track-scroll-start', true);
					trigger();
				}
				
				clearTimeout(timer);
				timer = setTimeout(
						function() {
							jqme.data('track-scroll-start', false);
						}, timeoutScroll
					);
			});
		},
		teardown: function() {
			$(this).unbind('touchmove.scrollstart scroll.scrollstart');
		}
	};
	
	$.event.special.scrollEnd = {
		enabled: true,
		setup: function() {
			var me = this,
				jqme = $(me),
				timer;
			
			function trigger() {
				$.event.dispatch.call(me, 'scrollEnd');
			}
			
			if(typeof jqme.data('track-scroll-end') === 'undefined') {
				jqme.data('track-scroll-end', false);
			}
			
			jqme.bind('touchmove.scrollend scroll.scrollend', function() {
				if(!jqme.data('track-scroll-end')) {
					jqme.data('track-scroll-end', true);
				}
				
				clearTimeout(timer);
				timer = setTimeout(
						function() {
							jqme.data('track-scroll-end', false);
							trigger();
						}, timeoutScroll
					);
			});
		},
		teardown: function() {
			$(this).unbind('touchmove.scrollend scroll.scrollend');
		}
	};
	
	$.event.special.resizeStart = {
		enabled: true,
		setup: function() {
			var me = this,
				jqme = $(me),
				timer;
				
			function trigger() {
				$.event.dispatch.call(me, 'resizeStart');
			}
			
			if(typeof jqme.data('track-resize') === 'undefined') {
				jqme.data('track-resize-start', false);
			}
			
			jqme.bind('resize.resizestart', function() {
				if(!jqme.data('track-resize-start')) {
					jqme.data('track-resize-start', true);
					trigger();
				}
				
				clearTimeout(timer);
				timer = setTimeout(
						function() {
							jqme.data('track-resize-start', false);
						}, timeoutResize
					);
			});
		},
		teardown: function() {
			$(this).unbind('resize.resizestart');
		}
	};
	
	$.event.special.resizeEnd = {
		enabled: true,
		setup: function() {
			var me = this,
				jqme = $(me),
				timer;
			
			function trigger() {
				$.event.dispatch.call(me, 'resizeEnd');
			}
			
			if(typeof jqme.data('track-resize-end') === 'undefined') {
				jqme.data('track-resize-end', false);
			}
			
			jqme.bind('resize.resizeend', function() {
				if(!jqme.data('track-resize-end')) {
					jqme.data('track-resize-end', true);
				}
				
				clearTimeout(timer);
				timer = setTimeout(
						function() {
							jqme.data('track-resize-end', false);
							trigger();
						}, timeoutResize
					);
			});
		},
		teardown: function() {
			$(this).unbind('resize.resizeend');
		}
	};
	
	$.each(
		customEvents,
		function(i, name) {
			$.fn[name] = function(handler) {
				return handler ? this.bind(name, handler) : this.trigger(name);
			};
		}
	);
	

})(jQuery, this);
