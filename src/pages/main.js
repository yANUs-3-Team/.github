import Header from "../component/header";
import Footer from "../component/footer";
import "../component/Css/main.css";

function Main() {
    return (
        <>
            <Header />
            <div className="main_page">
                메인 화면 테스트
                <p>이건 bold</p>
            </div>
            <Footer />
        </>
    )
}

export default Main;