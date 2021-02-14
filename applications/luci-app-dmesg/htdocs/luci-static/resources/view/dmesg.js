'use strict';
'require fs';
'require ui';

return L.view.extend({
	tailDefault: 25,

	parseLogData: function(logdata) {
		return logdata.trim().split(/\n/).map(line => line.replace(/^<\d+>/, ''));
	},

	load: function() {
		return fs.exec_direct('/bin/dmesg', [ '-r' ]).catch(e => {
			ui.addNotification(null, E('p', {}, _('Unable to load log data: ' + err.message)));
			return '';
		});
	},

	render: function(logdata) {
		let navBtnsTop = '120px';
		let loglines = this.parseLogData(logdata);

		 let logTextarea = E('textarea', {
			'id': 'syslog',
			'class': 'cbi-input-textarea',
			'style': 'width:100% !important; resize:horizontal; padding: 0 0 0 45px; font-size:12px',
			'readonly': 'readonly',
			'wrap': 'off',
			'rows': this.tailDefault,
			'spellcheck': 'false',
		}, [ loglines.slice(-this.tailDefault).join('\n') ]);

		let tailValue = E('input', {
			'id': 'tailValue',
			'name': 'tailValue',
			'type': 'text',
			'form': 'logForm',
			'class': 'cbi-input-text',
			'style': 'width:4em !important; min-width:4em !important',
			'maxlength': 5,
		});
		tailValue.value = this.tailDefault;
		ui.addValidator(tailValue, 'uinteger', true);

		let logFilter = E('input', {
			'id': 'logFilter',
			'name': 'logFilter',
			'type': 'text',
			'form': 'logForm',
			'class': 'cbi-input-text',
			'style': 'margin-left:1em !important; width:16em !important; min-width:16em !important',
			'placeholder': _('Message filter'),
			'data-tooltip': _('Filter messages with a regexp'),
		});

		let logFormSubmitBtn = E('input', {
			'type': 'submit',
			'form': 'logForm',
			'class': 'cbi-button btn',
			'style': 'margin-left:1em !important; vertical-align:middle',
			'value': _('Apply'),
			'click': ev => ev.target.blur(),
		});

		function setLogTail(cArr) {
			let tailNumVal = tailValue.value;
			if(tailNumVal && tailNumVal > 0 && cArr) {
				return cArr.slice(-tailNumVal);
			};
			return cArr;
		}

		function setLogFilter(cArr) {
			let fPattern = logFilter.value;
			if(!fPattern) {
				return cArr;
			};
			let fArr = [];
			try {
				fArr = cArr.filter(s => new RegExp(fPattern.toLowerCase()).test(s.toLowerCase()));
			} catch(err) {
				if(err.name === 'SyntaxError') {
					ui.addNotification(null,
						E('p', {}, _('Wrong regular expression') + ': ' + err.message));
					return cArr;
				} else {
					throw err;
				};
			};
			if(fArr.length === 0) {
				fArr.push(_('No matches...'));
			};
			return fArr;
		}

		return E([
			E('h2', { 'id': 'logTitle', 'class': 'fade-in' }, _('Kernel Log')),
			E('div', { 'class': 'cbi-section-descr fade-in' }),
			E('div', { 'class': 'cbi-section fade-in' },
				E('div', { 'class': 'cbi-section-node' },
					E('div', { 'id': 'contentSyslog', 'class': 'cbi-value' }, [
						E('label', { 'class': 'cbi-value-title', 'for': 'tailValue' },
							_('Show only the last messages')),
						E('div', { 'class': 'cbi-value-field' }, [
							tailValue,
							E('input', {
								'type': 'button',
								'class': 'cbi-button btn cbi-button-reset',
								'value': 'Χ',
								'click': ev => {
									tailValue.value = null;
									logFormSubmitBtn.click();
									ev.target.blur();
								},

							}),
							logFilter,
							E('input', {
								'type': 'button',
								'class': 'cbi-button btn cbi-button-reset',
								'value': 'Χ',
								'click': ev => {
									logFilter.value = null;
									logFormSubmitBtn.click();
									ev.target.blur();
								},
							}),
							logFormSubmitBtn,
							E('form', {
								'id': 'logForm',
								'name': 'logForm',
								'style': 'display:inline-block; margin-left:1em !important',
								'submit': ui.createHandlerFn(this, function(ev) {
									ev.preventDefault();
									let formElems = Array.from(document.forms.logForm.elements);
									formElems.forEach(e => e.disabled = true);

									return this.load().then(logdata => {
										let loglines = setLogFilter(setLogTail(
											this.parseLogData(logdata)));
										logTextarea.rows = (loglines.length < this.tailDefault) ?
											this.tailDefault : loglines.length;
										logTextarea.value = loglines.join('\n');
									}).finally(() => {
										formElems.forEach(e => e.disabled = false);
									});
								}),
							}, E('span', {}, '&#160;')),
						]),
					])
				)
			),
			E('div', { 'class': 'cbi-section fade-in' },
				E('div', { 'class': 'cbi-section-node' },
					E('div', { 'class': 'cbi-value' }, [
						E('div', { 'style': 'position:fixed' }, [
							E('button', {
								'class': 'btn',
								'style': 'position:relative; display:block; margin:0 !important; left:1px; top:'
									+ navBtnsTop,
								'click': ev => {
									document.getElementById('logTitle').scrollIntoView(true);
									ev.target.blur();
								},
							}, '&#8593;'),
							E('button', {
								'class': 'btn',
								'style': 'position:relative; display:block; margin:0 !important; margin-top:1px !important; left:1px; top:'
									+ navBtnsTop,
								'click': ev => {
									logTextarea.scrollIntoView(false);
									ev.target.blur();
								},
							}, '&#8595;'),
						]),
						logTextarea,
					])
				)
			),
		]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

