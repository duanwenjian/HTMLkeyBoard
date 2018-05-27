
class KeyBoardModule {
    constructor(input,porps,callback) {
        this.options = {
            zIndex: porps && porps.zIndex || 5000,
            width: porps && porps.width || '100%',
            height: porps && porps.height || '216px',
            fontSize: porps && porps.fontSize || '15px',
            backgroundColor: porps && porps.backgroundColor || '#fff',
            TABLE_ID: porps && porps.table_id || 'table_0909099',
            mobile: typeof orientation !== 'undefined',
            el: input,
            autoOpen:porps&&porps.autoOpen||true,
            callback: callback,
            open: false
        };
        return this._init();
    }

    _get(key) {
        return this.options[key];
    }

    _set(key, value) {
        this.options[key] = value;
        return true;
    }

    _init() {
        this._get('el').setAttribute('readonly','readonly');
        this._autoOpen();
        return {
            close:()=>{this._close()},
            open:()=>{this._open()}
        }
    }
    _clickOpen(){
        var open = this._get('open');
        if(open){
            this._close();
        }else{
            this._open();
        }
    }
    _clickEnd(){
        console.log(1);
    }
    _autoOpen(){
        var ele = this._get('el'),
            autoOpen = this._get('autoOpen');
        if(autoOpen){
            if (this._get('mobile')) {
                ele.ontouchstart = this._clickOpen.bind(this);
                ele.ontouchend = this._clickEnd.bind(this);
            } else {
                ele.onmousedown = this._clickOpen.bind(this);
                ele.onmouseup = this._clickEnd.bind(this);
            }
        }
    }

    _open() {
        this._createDiv();
        this._set('open', true);
    }

    _close() {
        this._removeDiv();
        this._set('open', false);
    }

    _removeDiv() {
        var body = document.getElementsByTagName('body')[0];
        body.removeChild(document.getElementById('__w_l_h_v_c_z_e_r_o_divid'));
    }
    _setAddValue(input,value){
        if (input) {
            var oldval = input.value;
            input.value += value;
        }
    }
    _setReduceValue(input){
        var num = input && input.value || false;
        if (num) {
            var newNum = num.substr(0, num.length - 1);
            input.value = newNum;
        }
    }

    _clickEvnet(e) {
        var ev = e || window.event;
        var clickEl = ev.element || ev.target;
        var value = clickEl.textContent || clickEl.innerText;
        var input = this._get('el');
        var clickElName = clickEl.tagName.toLocaleLowerCase();
        switch (clickElName){
            case 'div':
                this._close();
                break;
            case 'td':
                if(value!=='del') {
                    this._setAddValue(input,value);
                }else{
                    this._setReduceValue(input);
                }
                break;
            default:
                break;
        }
    }

    _createDiv() {
        var _div = document.createElement('div');
        _div.id = '__w_l_h_v_c_z_e_r_o_divid';
        _div.style.position = 'absolute';
        _div.style.left = 0;
        _div.style.right = 0;
        _div.style.bottom = 0;
        _div.style.zIndex = this._get('zIndex');
        _div.style.width = this._get('width');
        _div.style.height = this._get('height');
        _div.style.backgroundColor = this._get('backgroundColor');

        _div.innerHTML = this._createButton();
        this._bindEvent(_div);
        var body = document.getElementsByTagName('body')[0];
        if (document.getElementById('__w_l_h_v_c_z_e_r_o_divid')) {
            this._removeDiv();
        }
        body.appendChild(_div);
    }

    _bindEvent(div) {
        if (this._get('mobile')) {
            div.ontouchstart = this._clickEvnet.bind(this);
        } else {
            div.onclick = this._clickEvnet.bind(this);
        }
        return div;
    }

    _createButton() {
        //样式
        var cssStr = '<style type="text/css">';
        cssStr += '#' + this._get('TABLE_ID') + '{text-align:center;width:100%;height:186px;border-top:1px solid #CECDCE;background-color:#FFF;}';
        cssStr += '#' + this._get('TABLE_ID') + ' td{width:33%;border:1px solid #ddd;border-right:0;border-top:0;font-size:26px;line-height:1.4em;}';
        if (!this._get('mobile')) {
            cssStr += '#' + this._get('TABLE_ID') + ' td:hover{background-color:#1FB9FF;color:#FFF;}';
        }
        cssStr += '</style>';

        //Button
        var btnStr = '<div class="bgdiv" style="width:100%;text-align:center;height: 30px;position: relative;line-height:30px;border-radius:3px;cursor:pointer;background-color: #f3f3f3;">点击关闭键盘</div>';

        //table
        var tableStr = '<table id="' + this._get('TABLE_ID') + '" border="0" cellspacing="0" cellpadding="0">';
        tableStr += '<tr><td>(</td><td>-</td><td>)</td></tr>';
        tableStr += '<tr><td>1</td><td>2</td><td>3</td></tr>';
        tableStr += '<tr><td>4</td><td>5</td><td>6</td></tr>';
        tableStr += '<tr><td>7</td><td>8</td><td>9</td></tr>';
        tableStr += '<tr><td style="background-color:#D3D9DF;">+</td><td>0</td>';
        tableStr += '<td id="delbg" style="background-color:#D3D9DF;">del</td></tr>';
        tableStr += '</table>';
        return (cssStr + btnStr + tableStr);
    }
}
