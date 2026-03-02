const supabaseUrl="https://botdilueynfiuhiizpon.supabase.co";
const supabaseKey="sb_publishable_bvu7BFhmqnV66Kcid4illg_QoytYoUw";
const db=supabase.createClient(supabaseUrl,supabaseKey);

function openCategory(cat){
localStorage.setItem("category",cat);
window.location="products.html";
}

if(window.location.pathname.includes("products.html")){
loadProducts();
}

async function loadProducts(){
const cat=localStorage.getItem("category");
document.getElementById("title").innerText=cat.toUpperCase();

const {data}=await db.from("products").select("*").eq("category",cat);

const container=document.getElementById("products");
container.innerHTML="";

data.forEach(p=>{
container.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${p.price}</p>
<button onclick="orderProduct('${p.name}','${p.price}')">Order Now</button>
</div>
`;
});
}

async function orderProduct(name,price){

await db.from("orders").insert([{product_name:name,price:price}]);

document.getElementById("notification").innerHTML=
`New Order Received: ${name}`;

let message=`New Order:\n${name}\nPrice: ${price}`;
window.open(`https://wa.me/254700238274?text=${encodeURIComponent(message)}`);
}
