function pixelate() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var file = document.getElementById('file-input').files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var blockSize = 10;
            for (var y = 0; y < canvas.height; y += blockSize) {
                for (var x = 0; x < canvas.width; x += blockSize) {
                    var pixel = ctx.getImageData(x, y, blockSize, blockSize);
                    var r = 0, g = 0, b = 0;
                    for (var i = 0; i < pixel.data.length; i += 4) {
                        r += pixel.data[i];
                        g += pixel.data[i + 1];
                        b += pixel.data[i + 2];
                    }
                    r /= blockSize * blockSize;
                    g /= blockSize * blockSize;
                    b /= blockSize * blockSize;
                    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                    ctx.fillRect(x, y, blockSize, blockSize);
                }
            }

            var dataUrl = canvas.toDataURL('image/png');
            var imgElement = document.createElement('img');
            imgElement.src = dataUrl;
            document.body.appendChild(imgElement);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}