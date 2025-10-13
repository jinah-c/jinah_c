// AOS 초기화
AOS.init();

// jQuery 문서 준비 완료 시
$(document).ready(function(){
    // Slick 슬라이더 초기화
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: false, // 기본 화살표 숨김 (커스텀 버튼 사용할 경우)
        dots: false, // 기본 dots 비활성화
        slidesToShow: 1,
        slidesToScroll: 1
    });

    // 이전 버튼
    $('.prev-btn').click(function(){
        $('.slider').slick('slickPrev');
    });

    // 다음 버튼
    $('.next-btn').click(function(){
        $('.slider').slick('slickNext');
    });

    // 일시정지/재생 버튼
    let isPlaying = true;
    $('.play-pause-btn').click(function(){
        if(isPlaying) {
            $('.slider').slick('slickPause');
            $(this).find('img').attr('src', 'icon/play.png').attr('alt', '재생');
            isPlaying = false;
        } else {
            $('.slider').slick('slickPlay');
            $(this).find('img').attr('src', 'icon/pause.png').attr('alt', '일시정지');
            isPlaying = true;
        }
    });

    // 커스텀 도트 클릭 이벤트
    $('.custom-dot').click(function(){
        var slideIndex = $(this).data('slide');
        $('.slider').slick('slickGoTo', slideIndex);
    });

    // 슬라이더 변경 시 도트 활성화 상태 업데이트
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.custom-dot').removeClass('active');
        $('.custom-dot[data-slide="' + nextSlide + '"]').addClass('active');
    });

    // 햄버거 메뉴 클릭
    $(".hamburger").click(function(){
        $(this).toggleClass("is-active");
    });
});

// 페이지 로드 시 맨 위로 스크롤
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// 새로고침 시에도 맨 위로 스크롤
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// 사이드바와 토글 버튼 요소 선택
const sidebar = document.querySelector('.sidebar');
const sidebarBtn = document.querySelector('.sidebar button.sidebar_btn');

// 사이드바 버튼이 존재하는 경우에만 실행
if (sidebar && sidebarBtn) {
    const btnImg = sidebarBtn.querySelector('img');

    // 토글 버튼 클릭 이벤트
    sidebarBtn.addEventListener('click', () => {
        // .show 클래스 토글
        sidebar.classList.toggle('show');

        // 페이드 아웃 후 아이콘 변경하고 페이드 인
        btnImg.style.opacity = '0';

        setTimeout(() => {
            // 현재 상태에 따라 아이콘 변경
            if (sidebar.classList.contains('show')) {
                // 사이드바가 열려있을 때
                btnImg.src = './icon/close.svg';
            } else {
                // 사이드바가 닫혀있을 때
                btnImg.src = './icon/menu.svg';
            }
            // 페이드 인
            btnImg.style.opacity = '1';
        }, 200);
    });

    // 초기 상태 설정
    // 페이지 로드 시 현재 상태에 맞는 아이콘 설정
    if (sidebar.classList.contains('show')) {
        btnImg.src = './icon/close.svg';
    } else {
        btnImg.src = './icon/menu.svg';
    }
}

// 헤더 스크롤 효과
let lastScrollTop = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100; // 스크롤 시작 임계값 (픽셀)

// 헤더가 존재하는 경우에만 실행
if (header) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 스크롤이 임계값 이하면 헤더 항상 표시 (투명 배경)
        if (scrollTop < scrollThreshold) {
            header.classList.remove('hide');
            header.classList.remove('scrolled');
        }
        // 스크롤 다운 (아래로)
        else if (scrollTop > lastScrollTop) {
            header.classList.add('hide');
            header.classList.remove('scrolled');
        }
        // 스크롤 업 (위로)
        else {
            header.classList.remove('hide');
            header.classList.add('scrolled'); // 블러 배경 추가
        }

        lastScrollTop = scrollTop;
    });
}
