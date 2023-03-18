// import fetch from "node-fetch";

const img = document.querySelector(".result_img")

const ENDPOINT = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
const API_TOKEN = "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";

async function query(prompt) {
    const response = await fetch(
        ENDPOINT,
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(prompt),
        }
    );
    console.log(response)
    const result = await response.blob();
    console.log("result:", result);
    return result;

}

query({ inputs: "I want you to act as a photographer. I will provide you with images and you will create captions for them. My first request is I need help creating a photobook.s" }).then((response) => {
    //use image, 用JavaScript接收并显示字节流中的图片
    let reader = new FileReader();
    reader.readAsDataURL(response);
    // converts the blob to base64 and calls onload
    //get DataURL
    reader.onload = function() {
        img.src = reader.result;
    }
    
});


// # You can access the image with PIL.Image for example
// import io
// from PIL import Image
// image = Image.open(io.BytesIO(image_bytes))