import "../component/Css/header.css";

function Header() {
  return (
    <div className="header">
        <div className="headerLogo"></div>
        <div className="nav_container">
            <div className="nav_box">
                <div className="nav">서비스 소개</div>
                <div className="nav">동화 만들기</div>
                <div className="nav">나의 동화책</div>
                <div className="nav">공개 갤러리</div>
            </div>
            <div className="nav_box">
                <div className="nav">로그인</div>
                <div className="nav">회원가입</div>
            </div>
        </div>
    </div>
  );
}

export default Header;
