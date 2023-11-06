export default class Modal {
    constructor(btnOpen, btnClose, btnPlay, container, title, text) {
        this.btnOpen = btnOpen;
        this.btnClose = btnClose;
        this.btnPlay = btnPlay;
        this.container = container;
        this.title = title;
        this.text = text;
        
        this.toggleModal = this.toggleModal.bind(this);
        this.addModalEvents = this.addModalEvents.bind(this);
        this.newHTMLModal = this.newHTMLModal.bind(this);
        this.initModal = this.initModal.bind(this);
    }
    toggleModal(event) {
        event.preventDefault();
        this.container.classList.toggle('active');
    }
    newHTMLModal(newTitle, newText, newBtn) {
        this.title.textContent = newTitle;
        this.text.textContent = newText;
        this.btnPlay.textContent = newBtn;
    }
    addModalEvents() {
        if (this.btnOpen) {
            this.btnOpen.addEventListener('click', this.toggleModal);
        }
        if (this.btnClose && this.container) {
            this.btnClose.addEventListener('click', this.toggleModal);
            this.btnPlay.addEventListener('click', this.toggleModal);
            this.container.addEventListener('click', this.cliqueForaModal);
        }
    }
    initModal() {
        this.addModalEvents()
    }
}
