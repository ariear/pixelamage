var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
};

const fileInput = document.getElementById('file-input');
const imageOutput = document.getElementById('imageOutput');
const downloadBtn = document.getElementById('downloadButton')

fileInput.addEventListener('change', function() {
	const file = fileInput.files[0];
	const reader = new FileReader();
	
	reader.addEventListener('load', function() {
		const image = new Image();
		image.addEventListener('load', function() {
			imageOutput.src = pixelateImage(image, 10);
		});
		image.src = reader.result;
	});
	
	reader.readAsDataURL(file);
});

function pixelateImage(image, pixelSize) {
	const canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;
	
	const context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	
	const pixelWidth = Math.ceil(canvas.width / pixelSize);
	const pixelHeight = Math.ceil(canvas.height / pixelSize);
	
	context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, pixelWidth, pixelHeight);
	context.drawImage(canvas, 0, 0, pixelWidth, pixelHeight, 0, 0, canvas.width, canvas.height);
	
	return canvas.toDataURL();
}

downloadBtn.addEventListener('click', (e) => {
    const link = document.createElement('a');
    const fileExtension = imageOutput.src.split('.').pop();
    link.download = `pixelamage-${Math.floor(Math.random() * 101)}.png`;
    link.href = imageOutput.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})