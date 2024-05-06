import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
function Slider()
{
    return (
        <div className="slider">
            <AliceCarousel autoPlay autoPlayInterval={600} infinite={true}>
                <center><img src="/food3.webp" className="sliderimg" alt="" width="50%" height="50%"/></center>
                <center><img src="/food2.jpg" className="sliderimg" alt="" width="50%" height="50%"/></center>
                 <center><img src="/img2.jpeg" className="sliderimg" alt="" width="50%" height="50%"/></center> 
                <center><img src="/homeImg.jpg" className="sliderimg" alt="" width="50%" height="50%"/></center>
                <center><img src="/homeImg2.webp" className="sliderimg" alt="" width="50%" height="50%"/></center>
            </AliceCarousel>
        </div>
    )
}

export default Slider;