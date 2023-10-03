export class Play_Pause_Control{
    constructor(){
        this.button = document.getElementById("play-pause");
    }

    // 判断是否暂停
    is_paused(animationId){
        return animationId === -1;
    }

    // 开始
    play(){
        this.button.textContent = "⏸";
    }

    // 暂停
    // 将animationId置为null，以判断是否暂停
    pause(animationId) {
        this.button.textContent = "▶";
        cancelAnimationFrame(animationId);
        return -1;
    };

    
}