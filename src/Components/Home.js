import React, { useState, useEffect } from 'react'
import { Image } from 'cloudinary-react';
function Home() {

    const [imageIDs, setImageIDs] = useState()


    const loadImages = async () => {
        try {
            const response = await fetch('/api/images')
            const data = await response.json()
            console.log(data)
            setImageIDs(data)
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    useEffect(() => {
        loadImages();
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {imageIDs && imageIDs.map((imageID, index) => (
                <Image key={index} cloudName="dkrvgptq8" publicId={imageID} width="600" crop="scale"
                    style={{
                        padding: "20px",
                        margin: "30px"
                    }}
                />
            ))}
        </div>
    )
}

export default Home
