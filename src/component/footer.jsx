import "../component/Css/footer.css";

function Footer() {
  return (
    <div className="footer">
        <div className="underNav_box">
            <div className="underNav">서비스 소개</div>
            <div className="underNav">동화 만들기</div>
            <div className="underNav">나의 동화책</div>
            <div className="underNav">공개 갤러리</div>
        </div>
        <div className="underText_box">
            <div className="underText">ⓒ</div>
            <div className="underText">2025</div>
            <div className="underText">SOFTWARE CONVERGENCE</div>
            <div className="underText">GYEONGKUK NATIONAL UNIVERSITY</div>
        </div>
    </div>
  );
}

export default Footer;