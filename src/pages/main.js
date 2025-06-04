import Header from "../component/header";
import Footer from "../component/footer";
import "../component/Css/main.css";

function Main() {
    return (
        <div className="main_page">
            <Header />
            메인 화면 테스트
            <p>이건 bold</p>
            <Footer />
        </div>
    )
}

export default Main;