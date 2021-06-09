const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")


let totalImages = 0
let ready = false
let imagesLoaded = 0
let photosArray = []

let count = 5;
const apiKey = 'YnTE9tK93kreWqIPCiQjGxHdovky9AxMrzVTBKga6Xg';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


//CHeck if all images were loaded
const imageLoading = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages){
        loader.hidden = true
        console.log("Oh yeaa Im ready, take mah load!")
        ready = true
    }
}



//setAttributes of items
const setAttributes = (item, attributes) => {
    for (key in attributes){
        item.setAttribute(key, attributes[key])
    }
}

// Create elements for links & photos
const displayPhotos = () => {
    totalImages = photosArray.length
    console.log("totalImages : ",totalImages)
    photosArray.forEach(photo => {
        //Create <a> to link to unsplash
        const item = document.createElement("a")
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
        
        //Create img for photo
        const img = document.createElement("img")
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //check when each is finished loading
        img.addEventListener('load',imageLoading)
        //put img inside a and then both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

//Get photos from unsplash api
const getPhotos = async () => {
    try{
        const response = await fetch(apiURL)
        photosArray = await response.json()
        displayPhotos()
    }
    catch(error){
        console.log(error)
    }
}

//Check to see if scrolling near bottom of page, unload on user
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false
        imagesLoaded = 0
        getPhotos()
    }
})



// ONload
getPhotos()