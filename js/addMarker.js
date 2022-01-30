AFRAME.registerComponent("create-markers",{

init: async function(){
var main_scene = document.querySelector("#main-scene")
var dishes = await this.getDishes()

dishes.map(dish=>{
    var marker = document.createElement("a-marker")
    marker.setAttribute("id",dish.id)
    marker.setAttribute("type","pattern")
    marker.setAttribute("url",dish.marker_pattern_url)
    marker.setAttribute("cursor",{rayOrigin:"mouse"})
    marker.setAttribute("markerhandler",{})
    main_scene.appendChild(marker)

    var todaysDate = new Date()
    var todaysDay = todaysDate.getDay()
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    if(!dish.unavailable_days.includes(days[todaysDay])){
        
    var model = document.createElement("a-entity")
    model.setAttribute("id",`model-${dish.id}`)
    model.setAttribute("position",dish.model_geometry.position)
    model.setAttribute("rotation",dish.model_geometry.rotation)
    model.setAttribute("scale",dish.model_geometry.scale)
    model.setAttribute("gltf-model",`url(${dish.model_url})`)
    model.setAttribute("gesture-handler",{})
    model.setAttribute("visible",false)
    marker.appendChild(model)

    var main_plane = document.createElement("a-plane")
    main_plane.setAttribute("id",`main-plane-${dish.id}`)
    main_plane.setAttribute("position",{x:0,y:0,z:0})
    main_plane.setAttribute("rotation",{x:-90,y:0,z:0})
    main_plane.setAttribute("width",1.7)
    main_plane.setAttribute("height",1.5)
    main_plane.setAttribute("visible",false)
    marker.appendChild(main_plane)

    var title_plane = document.createElement("a-plane")
    title_plane.setAttribute("id",`title-plane-${dish.id}`)
    title_plane.setAttribute("position",{x:0,y:0.89,z:0.02})
    title_plane.setAttribute("rotation",{x:0,y:0,z:0})
    title_plane.setAttribute("width",1.69)
    title_plane.setAttribute("height",0.3)
    title_plane.setAttribute("material",{color:"#f0c30f"})
    main_plane.appendChild(title_plane)

    var dish_title = document.createElement("a-entity")
    dish_title.setAttribute("id",`dish-title-${dish.id}`)
    dish_title.setAttribute("position",{x:0,y:0,z:0.1})
    dish_title.setAttribute("rotation",{x:0,y:0,z:0})
    dish_title.setAttribute("text",{
        font:"monoid",
        color:"black",
        width:1.8,
        height:1,
        align:"center",
        value:dish.dish_name.toUpperCase()
    })
    title_plane.appendChild(dish_title)

    var ingredients = document.createElement("a-entity")
    ingredients.setAttribute("id",`ingredients-${dish.id}`)
    ingredients.setAttribute("position",{x:0.3,y:0,z:0.1})
    ingredients.setAttribute("rotation",{x:0,y:0,z:0})
    ingredients.setAttribute("text",{
        font:"monoid",
        color:"black",
        width:2,
        align:"left",
        value:`${dish.ingredients.join("\n\n")}`
    })
    main_plane.appendChild(ingredients)

    var pricePlane = document.createElement("a-image")
    pricePlane.setAttribute("id",`price-plane-${dish.id}`)
    pricePlane.setAttribute(
        "src","https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
    )
    pricePlane.setAttribute("width",0.8)
    pricePlane.setAttribute("height",0.8)
    pricePlane.setAttribute("position",{x:-1.3,y:0,z:0.3})
    pricePlane.setAttribute("rotation",{x:-90,y:0,z:0})
    
    
    var price = document.createElement("a-entity")
    price.setAttribute("id",`price-${dish.id}`)
    price.setAttribute("position",{x:0.03,y:0.05,z:0.1})
    price.setAttribute("rotation",{x:0,y:0,z:0})
    price.setAttribute("text",{font:"mozillavr",color:"white",width:3,align:"center",value: `Only\n $${dish.price}`})
    pricePlane.appendChild(price)
    marker.appendChild(pricePlane)

    var ratingPlane = document.createElement("a-entity")
    ratingPlane.setAttribute("id",`rating-plane-${dish.id}`)
    ratingPlane.setAttribute("position",{x:2,y:0,z:0.5})
    ratingPlane.setAttribute("geometry",{
    primitive:"plane",
    width:1.5,
    height:0.3
    })
    ratingPlane.setAttribute("material",{
    color:"#f0c30f"
    })
    ratingPlane.setAttribute("rotation",{x:-90,y:0,z:0})
    ratingPlane.setAttribute("visible",false)
    
    //ratings
    var ratings = document.createElement("a-entity")
    ratings.setAttribute("id",`ratings-${dish.id}`)
    ratings.setAttribute("position",{x:0,y:0.05,z:0.1})
    ratings.setAttribute("rotation",{x:0,y:0,z:0})
    ratings.setAttribute("text",{
    font:"mozillavr",
    color:"black",
    width:2.4,
    align:"center",
    value:`Customer Rating : ${dish.last_rating}`
    })
    ratingPlane.appendChild(ratings)
    marker.appendChild(ratingPlane)

    var reviewPlane = document.createElement("a-entity")
    reviewPlane.setAttribute("id",`review-plane-${dish.id}`)
    reviewPlane.setAttribute("position",{x:2,y:0.,z:0})
    reviewPlane.setAttribute("geometry",{
        primitive:"plane",
        width:1.5,
        height:0.5
    })
    reviewPlane.setAttribute("material",{
        color:"#f0c30f"
        })
        reviewPlane.setAttribute("rotation",{x:-90,y:0,z:0})
        reviewPlane.setAttribute("visible",false)

        var review = document.createElement("a-entity")
        review.setAttribute("id",`review-${dish.id}`)
        review.setAttribute("position",{x:0,y:0.05,z:0.1})
        review.setAttribute("rotation",{x:0,y:0,z:0})
        review.setAttribute("text",{
        font:"mozillavr",
        color:"black",
        width:2.4,
        align:"center",
        value:`Customer Review : ${dish.last_review}`
        })
        reviewPlane.appendChild(review)
        marker.appendChild(reviewPlane)

}

})

},


getDishes: async function(){
return await firebase
.firestore()
.collection("dishes")
.get()
.then(snap=>{
    return snap.docs.map(doc=>doc.data())
})
}
})