class RMSProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.bufferSize = 512 * 50;
        this.buffer = new Float32Array(this.bufferSize);
        this.currentIndex = 0;
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const channel = input[0];
        const channelLength = channel.length;

        for (let i = 0; i < channelLength; i++) {
            this.buffer[this.currentIndex] = channel[i];
            this.currentIndex = (this.currentIndex + 1) % this.bufferSize;
        }

        if (this.currentIndex === 0) {
            let sum = 0;
            for (let i = 0; i < this.bufferSize; i++) {
                sum += this.buffer[i] * this.buffer[i];
            }

            const rmsValue = Math.sqrt(sum / this.bufferSize);
            const rmsInDecibels = 20 * Math.log10(rmsValue);

            this.port.postMessage(rmsInDecibels);
        }

        return true;
    }
}

registerProcessor('rms-processor', RMSProcessor);
