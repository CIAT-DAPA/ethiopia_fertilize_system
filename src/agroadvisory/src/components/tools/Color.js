class Color {

    get_n_color(d) {
        return d >= 200.0
                 ? "#FF66B3" 
                 : d >= 190.0
                     ? "#d966ff" 
                     : d >= 180.0
                         ? "#8c66ff"
                         : d >= 170.0
                             ? "#668cff"
                             : d >= 160.0
                                 ? "#66d9ff"
                                 : d >= 150.0
                                     ? "#66ffd9"
                                     : d >= 140.0
                                         ? "#66ff99"
                                         : d >= 130.0 
                                             ? "#8cff66"
                                             : d >= 120.0
                                                 ? "#d9ff66"
                                                 : d >= 110.0
                                                     ? "#ffd966"
                                                     : d >= 100.0
                                                         ? "#ff6666": "#ffffff";
    }
    get_p_color(d) {
        return d >= 33.0
                 ? "#ff0000" 
                 : d >= 29.0
                     ? "#ffb3b3" 
                     : d >= 25.0
                         ? "#660000"
                         : d >= 21.0
                             ? "#004de6"
                             : d >= 17.0
                                 ? "#80aaff"
                                 : d >= 13.0
                                     ? "#c2c2a3"
                                     : d >= 9.0
                                         ? "#d9ffb3"
                                         : d >= 5.0 
                                             ? "#4dff88" : "#ffffff";
    }
    get_yield_color(d){
        return d >= 10447.60
                 ? "#00e600" 
                 : d >= 8997.60 && d < 10447.60
                     ? "#aaff80" 
                     : d >= 7547.60 && d < 8997.60
                         ? "#662200"
                         : d >= 6097.60 && d < 7547.60
                             ? "#ac00e6"
                             : d >= 1 && d < 6097.60
                                 ? "#80aaff" : "#ffffff";

    }
    get_urea_color(d){
        return d >= 300.0
                 ? "#008080" 
                 : d >= 250.0 && d < 300.0
                     ? "#990000" 
                     : d >= 200.0 && d < 250.0
                         ? "#b35900"
                         : d >= 135.0 && d < 200.0
                             ? "#ffe699" : "#ffffff";

    }
    get_nps_color(d){
        return d >= 150.0
                 ? "#206040" 
                 : d >= 100.0 && d < 150.0
                     ? "#00b300" 
                     : d >= 50.0 && d < 100.0
                         ? "#e6ac00"
                         : d >= 30.0 && d < 50.0
                             ? "#660000" : "#ffffff";

    }
    get_vcompost_color(d){
        return d >= 15.0
                 ? "#00cc00" 
                 : d >= 10.0 && d < 15.0
                     ? "#cccc00" 
                     : "#ffffff";

    }
    get_compost_color(d){
        return d >= 21.0
                 ? "#4d0000" 
                 : d >= 16.0 && d < 21.0
                     ? "#e6ac00" 
                     : d >= 12.0 && d < 16.0
                         ? "#c2c2a3" : "#ffffff";

    }
    get_dominant_color(d){
        return d >= 200.0
                 ? "#fc9f67" 
                 : d >= 100.0 && d < 200.0
                     ? "#60ba6c" 
                     : d >= 0.0 && d < 100.0
                         ? "#5ba3d0" : "#ffffff";

    }
    
    get_layer_color (d, layer, geoserverLayers){
        if (layer === geoserverLayers[0]){
            return this.get_n_color(d);
        }
        else if (layer === geoserverLayers[1]){
           return this.get_p_color(d);
        }
        else if (layer === geoserverLayers[2]){
           return this.get_yield_color(d);
        }
        else if (layer === geoserverLayers[3]){
            return this.get_urea_color(d);
        }
        else if (layer === geoserverLayers[4]){
            return this.get_nps_color(d);
        }
        else if (layer === geoserverLayers[5]){
            return this.get_vcompost_color(d);
        }
        else if (layer === geoserverLayers[6]){
            return this.get_compost_color(d);
        }
        else if (layer === geoserverLayers[7]){
            return this.get_dominant_color(d);
        }
        else {
            return "#ffffff";
        }
    }
}

export default new Color();