var ColorPicker = new Class({

	Implements: Options,
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
				, '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4C1130'],
    },
	
    initialize: function(element,options){
        this.setOptions(options);
        this.element = document.id(element);
        
        // Create element
        this.build();
        
        //this.bound = this.someMethod.bind(this);
    },

    attach: function(){
		return this;
	},

	detach: function(){
		return this;
	},
	
    build: function(){
        
        var self = this;
        
        // ColorBox creation
        var colorBox = new Element('div',{
            class: 'colorpicker-box',
            id: self.options.prefix + '-colorbox'

        })
        
        var colorBoxColors =  new Element('ul');
    
        Array.each( self.options.colors, function(currentColor,i){

            var colorUnit = new Element('li',{
                                styles: {
                                    'background-color': currentColor
                                },
                                title: currentColor,
                                id: self.options.prefix + '-color-' + i,
                                'data-color': currentColor,
                                events: {
                                    click: function(){
                                        self.selected(currentColor, colorInput, colorBox);
                                    },
                                    mouseover: function(){
                                        if(self.options.changeOnHover === true){
                                            self.hover(currentColor, colorInput);
                                        }
                                    }
                                }
                            });
                
			if (i % self.options.colorsPerLine === 0){
				colorUnit.setStyle('clear','both');
			}
				
            colorUnit.inject(colorBoxColors);
        });
        
        // ColorInput creation
        var colorInput = new Element('div',{
                class: 'colorpicker-input',
                styles: {
                    'background-color' : self.options.defaultColor
                },
                'data-color': self.options.defaultColor,
                events: {
                    click: function(){
                        self.show(colorBox);
                    }
                }
            });
        
        this.element.set('value',self.options.defaultColor);
        
        colorBox.position({
            relativeTo: colorInput,
            position: 'upperLeft',
            edge: 'upperLeft'
        });

        // Place elements
        colorInput.inject(this.element,'after');
        colorBoxColors.inject(colorBox);
        colorBox.inject(colorInput,'after');
        
        // Hide the colorbox
        self.hide(colorBox);
        self.hide(self.element);
        
        return this;
    },
    
    selected: function(color, input, box){
        this.hide(box);
        this.element.set('value',color);
        input.set('data-color',color).setStyle('background-color',color);
    },
    
    hover: function(color,input){
        input.setStyle('background-color',color);
    },
    
    hide: function(element){
        element.setStyle('display','none');
    },
    
    show: function(element){
        element.setStyle('display','block');
    }

});