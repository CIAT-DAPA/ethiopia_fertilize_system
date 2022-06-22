class Color {
    get_color(d) {
        return d > 100.0
            ? "#800026"
            : d > 80.0
                ? "#BD0026"
                : d > 60.0
                    ? "#E31A1C"
                    : d > 40.0
                        ? "#FC4E2A"
                        : d > 20.0
                            ? "#FD8D3C"
                            : d > 10.0
                                ? "#FEB24C"
                                : d > 5.0
                                    ? "#FED976"
                                    : "#FFEDA0";
    }
}

export default new Color();