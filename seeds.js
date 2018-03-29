var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Repouso nas Nuvens", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum dolor quis augue vulputate, id consectetur sapien bibendum. Quisque sollicitudin eros eu diam dapibus luctus. In eleifend nisl lectus, vitae mattis enim dapibus eu. Curabitur quis tincidunt lorem. Praesent vel ornare tortor. Donec varius dolor eget molestie aliquam. Nulla ut tellus enim. Ut ut purus non leo lacinia bibendum nec id arcu. Nunc rutrum orci quis lectus scelerisque luctus. Maecenas ligula ante, tempus id nibh nec, semper fermentum diam. Sed sagittis dui sed urna viverra gravida. Cras eget mauris eget sem porta luctus. Suspendisse mattis interdum rhoncus."

    },
    {
        name: "Deserto Duka", 
        image: "https://images.unsplash.com/photo-1515575811195-bd1f8dd18e9a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b37caddd5b0ff1484baf1bdc13d76c1&auto=format&fit=crop&w=1355&q=80",
        description: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc pellentesque maximus leo, sed imperdiet enim finibus molestie. Morbi convallis tellus venenatis nunc vulputate rhoncus. Nulla nunc nibh, rhoncus eget leo auctor, pellentesque facilisis nisi. Maecenas id est eu leo pulvinar aliquet. Praesent maximus congue ligula, quis ornare dui finibus sed. Morbi congue massa at nisl tincidunt, sed rutrum tortor euismod. Sed placerat et odio at sollicitudin."
    },
    {
        name: "Itaimbezinho", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Sed fermentum, elit quis efficitur vehicula, neque sem varius ante, quis pellentesque quam ex non metus. Nulla feugiat neque eget ante accumsan fringilla. Mauris id nisi sit amet purus suscipit facilisis sed ac"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //  //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("Acampamento Adicionado!!!");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "Esse lugar é demais, as pessoas até conversam por não haver sinal de dados por aqui!",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Comentário Adicionado"); 
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few comments
}

module.exports = seedDB;
