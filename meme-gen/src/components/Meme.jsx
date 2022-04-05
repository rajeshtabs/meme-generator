import React from 'react'


export default function Meme(){
    const [memeImage,setMemeImage] = React.useState({
        topText:"",
        bottomText:"",
        imageUrl:"https://i.imgflip.com/26jxvz.jpg"
    })
    const [allMemeImages,setAllMemeImages] =React.useState([])
    
    
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(item => setAllMemeImages(item.data.memes))
    },[])

    function showImage(){
      
        const randomNumber = Math.floor(Math.random()*allMemeImages.length);
        const url = allMemeImages[randomNumber].url;
        setMemeImage(prevMemeImage => {
            return{
                ...prevMemeImage,
                imageUrl: url
            }
            })

    }

    function showChange(event){
        const{name ,value} = event.target
        setMemeImage(prevState=>{
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    
    
    return(
        <main className="main-container">
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={memeImage.topText}
                    onChange={showChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={memeImage.bottomText}
                    onChange={showChange}
                />
                <button 
                    className="form--button" onClick={showImage}
                >
                    Get a new meme image 🖼️
                </button>
            </div>
            <div className="meme">
            <img src={memeImage.imageUrl} className="meme-image"  />
            
            <h2 className="top">{memeImage.topText}</h2>
            <h2 className="bottom">{memeImage.bottomText}</h2>
            </div>
            
       
        </main>
    )
}