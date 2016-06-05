var ColorPicker = new Class({
    Implements: [Options],
    options: {
        defaultColor: '#FFFFFF',
        colorsPerLine: 8,
        changeOnHover: false,
        prefix: 'colorpicker',
        colors: ['#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff'
                    , '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff'
                    , '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc'
                    , '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd'
                    , '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0'
                    , '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79'
                    , '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47'
                    , '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4C1130']
    },
    element: null,
    back: null,
    box: null,
    input: null,
    initialize: function (element, options) {
        this.setOptions(options);
        this.element = document.id(element);
        // Create element
        this.build();
    },
    build: function () {

        var self = this;

        // Build back
        this.back = new Element('div', {
            id: this.options.prefix + '-colorback'
        });

        // Build colorbox
        this.box = new Element('div', {
            'class': 'colorpicker-box',
            id: this.options.prefix + '-colorbox',
            events: {
                mouseleave: function () {
                    if (self.options.changeOnHover === true) {
                        self.setDefaultColor();
                    }
                }
            }
        });
        var colorBoxColors = new Element('ul');

        // Build color selection
        Array.each(this.options.colors, function (currentColor, i) {

            currentColor = currentColor.toUpperCase();

            var colorUnit = new Element('li', {
                styles: {
                    'background-color': currentColor
                },
                'class': 'colorpicker-color',
                title: currentColor,
                id: self.options.prefix + '-color-' + i,
                'data-color': currentColor,
                events: {
                    click: function () {
                        self.selectColor(currentColor);
                    },
                    mouseover: function () {
                        if (self.options.changeOnHover === true) {
                            self.hoverColor(currentColor);
                        }
                    }
                }
            });

            if (i % self.options.colorsPerLine === 0) {
                colorUnit.setStyle('clear', 'both');
            }

            colorUnit.inject(colorBoxColors);
        });

        // Build color input
        this.input = new Element('div', {
            'class': 'colorpicker-input',
            styles: {
                'background-color': this.options.defaultColor
            },
            'data-color': this.options.defaultColor,
            'title': this.options.defaultColor,
            events: {
                click: function () {
                    self.positionAndShowBox();
                }
            }
        });

        // Initialize default color
        this.element.set('value', this.options.defaultColor);
        this.setDefaultColor();

        // Onblur event
        $$('body').addEvent('click', function (e) {
            if (!$(e.target).hasClass('colorpicker-color') && !$(e.target).hasClass('colorpicker-input')) {
                self.setDefaultColor();
                self.hide(self.box);
            }
        });

        // Place elements
        this.input.inject(this.element, 'after');
        colorBoxColors.inject(this.box);
        this.box.inject(this.input, 'after');
        this.back.inject(this.input, 'after');

        // Hide the colorbox
        this.hide(this.box);
        this.hide(this.element);

        return this;
    },
    selectColor: function (color) {
        this.hide(this.box);
        this.back.removeClass('colorpicker-back');
        this.element.set('value', color);
        this.input.set('data-color', color).set('title', color).setStyle('background-color', color);
        this.element.fireEvent('onSelectColor');
    },
    setDefaultColor: function () {
        var color = this.element.get('value');
        this.input.set('data-color', color)
                .set('title', color)
                .setStyle('background-color', color);
        this.element.fireEvent('onSetDefaultColor');
    },
    hoverColor: function (color) {
        this.input.setStyle('background-color', color);
    },
    hide: function (element) {
        element.setStyle('display','none');
    },
    show: function (element) {
        element.setStyle('display','block');
    },
    positionAndShowBox: function () {
        this.box.position({
            relativeTo: this.input,
            position: 'bottomLeft',
            edge: 'upperLeft'
        });
        this.show(this.box);
        this.back.addClass('colorpicker-back');
    }
});