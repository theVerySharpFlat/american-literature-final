import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';

export class DOMTerminal {
    container;
    _term: Terminal;
    _data: string;
    _inputReady: boolean = false;

    constructor() {
        console.log("initializing temrinal...");
        this.container = document.getElementById("terminal-container")
        this._data = "";

        this._term = new Terminal({
            convertEol: true
        })

        if (this.container != null) {
            this.container.innerHTML = "";
            const fitAddon = new FitAddon()

            this._term.loadAddon(fitAddon);
            this._term.open(this.container);

            fitAddon.fit();

            window.onresize = () => {
                fitAddon.fit()
            }

            this._term.onData(recv => {
                if (this._writeBuf.length == 0) {
                    if (recv === "\u007F") {
                        this._term.write("\b \b");
                        this._data = this._data.substring(0, this._data.length - 1);
                    } else if (recv === "\r") {
                        this._inputReady = true;
                        this._term.write("\n");
                    } else {
                        this._term.write(recv);
                        this._data += recv;
                    }
                }
            })

            this._data = "";

            setInterval(() => {
                this.outputChar();
            }, 1);
        }
    }

    get inputReady() {
        return this._inputReady;
    }

    readLine(): string {
        if (this.inputReady) {
            this._inputReady = false;
            let ret = this._data;
            this._data = "";
            return ret;
        }
        return "";
    }

    _writeBuf: string = "";
    writeData(str: string) {
        this._writeBuf += str;
    }

    outputChar() {
        if (this._writeBuf.length != 0) {
            let outputChar = this._writeBuf.charAt(0);
            this._writeBuf = this._writeBuf.substring(1);

            this._term.write(outputChar);
        }
    }

    get columns() {
        return this._term.cols;
    }

    get rows() {
        return this._term.rows;
    }

    clear() {
        this._term.write("\x1b[H\x1b[2J");
    }

}
