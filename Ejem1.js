/*
1.- Hacer una petición a la PokeAPI para obtener cualquier Pokémon.  Muestra sus tipos en consola mediante un for.
                    https://pokeapi.co/

2.- Escribe una función que al ejecutarse realice una petición a la API de Open Library.
    (Ejemplo: peticionLibro("i robot");
    Buscar un libro y traer el o los autores del primer libro
    http://openlibrary.org/search.json?q=i+robot) 

3.- Hacer una petición por autor y devolver la lista de 
    sus libros
        http://openlibrary.org/search.json?author=asimov

4.- Hacer una petición y devolver el género de la banda deseada
    http://www.theaudiodb.com/api/v1/json/1/search.php?s=muse

5.- Hacer una petición a la swapi para obtener un personaje y también obtener 
    las películas donde aparece.
                    https://swapi.co/

7.- Traer los primeros 151 pokemon de la primera generacion y 
    devolver un arreglo de objetos con el nombre, sus moves, tipos, tamaño 
    y peso.
                      https://pokeapi.co/
*/
import request from "request";
import fetch from 'node-fetch';
const poquerequest= (pokemon)=>{
    const url='https://pokeapi.co/api/v2/pokemon/'+pokemon;
    request.get(url,(err,status,body)=>{
        if(err||status.statusCode==400)return null
        const pokePersonaje=JSON.parse(body);
        const{name,types}=pokePersonaje;
        console.log(name);
        let type=types.map(e=>{
            return e.type.name
        })
        console.log(type);
    });
}
//poquerequest("squirtle");
const bookSearch=(books)=>{
    newBook=books.split(" ").join("+");
    const url="http://openlibrary.org/search.json?q="+newBook;
    request(url,(err,status,body)=>{
        if(status.statusCode==400)return null
        const book=JSON.parse(body);
        if(err||book.docs.length==0)return null;
        const {docs:[first]}=book;
        const {author_name,title}=first;
        console.log("Link book: "+title+"\nAuthors: "+author_name);
    });
    console.log(newBook);
}
//bookSearch("the 1000")

const authorSearch= (authors)=>{
    const url="http://openlibrary.org/search.json?author="+authors;
    request.get(url,(err,status,body)=>{
        if(status.statusCode==400||err)return null
        const {docs}=JSON.parse(body);
        if(docs.length==0)return null;
        const names=docs.map(e=>e.title)
        console.log(names.join("\n"));
    });
};
//authorSearch("asimov");
const genderMusic=(bands)=>
{
    const url=`http://www.theaudiodb.com/api/v1/json/1/search.php?s=${bands}`;
    request.get(url,(err,status,body)=>{
        if(status.statusCode==400||err) return null;
        const {artists:[a]}=JSON.parse(body);
        if(a==null)return null;
        const {strGenre}=a;
        console.log(strGenre);
    });
}
//genderMusic("metallica");
const starwarsMovies=(movies)=>{
    const url=`https://swapi.dev/api/people/`;
    request.get(url,(err,status,body)=>{
        if(err||status.statusCode==400) return console.log("Error coneccion");
        const {results}=JSON.parse(body);
        const Character=results.map(e=>e.name).indexOf(movies)??-1;
        if(Character==-1)return console.log("No se encontro el personaje");
        const Films= results[Character].films.map(e=>{
            request.get(e,(sErr,Sstatus,sbody)=>{
                if(sErr||Sstatus.statusCode==400) return console.log("Nos se puedo encontar la api de peli");
                const {title}=JSON.parse(sbody);
                console.log(title);
            })
        });
    });
}
//starwarsMovies("C-3PO");
class PokeInfo
{
    constructor(name,movimientos,tipos,tamaño,peso)
    {
        this.name=name
        this.movimientos=movimientos;
        this.tipos=tipos;
        this.tamaño=tamaño;
        this.peso=peso;
    }
}
async function Llamada(x)
{
    const response= await fetch(x);
    const req=response.json();
    return req;
}
var Pokenames=[]
Llamada("https://pokeapi.co/api/v2/pokemon").then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
}).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
})).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
})).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
})).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
})).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
})).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {next,results}=jsresponse;
    results.map(e=>Pokenames.push(e));
    return next
})).then(secondR=>Llamada(secondR).then(jsresponse=>{
    const {results}=jsresponse;
    for(let i=0;i<11;i++)
    {
        Pokenames.push(results[i]);
    }
    return Pokenames;
})).then(array=>{
    array.map(e=>{
        let valor=Llamada(e.url).then(x=>{
            const {moves:[...a],types:[...b],height,weight}=x
            const move=a.map(e=>e.move?.name);
            const c=b.map(e=>e.type?.name);
            e.name=new PokeInfo(e.name,move,c,height,weight);
            console.log(e.name);
        });
    });
});