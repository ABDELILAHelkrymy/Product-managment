// variables 

price = document.getElementById('price')
taxes = document.getElementById('taxes')
ads = document.getElementById('ads')
discount = document.getElementById('discount')
total = document.getElementById('total')
count = document.getElementById('count')
category = document.getElementById('category')
submit = document.getElementById('submit')
search = document.getElementById('search')
searchByTitle = document.getElementById('searchTitle')
searchByCategory = document.getElementById('searchCategory')
let mod = 'create';
indexOfUpdateItem = 0;


// get total

const getTotal = () => {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    } else {
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
}
// create product
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    let dataProduct = []
}


submit.onclick = () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (mod == 'create') {
        if (newProduct.count > 1) {
            for (let index = 0; index < +newProduct.count; index++) {
                dataProduct.push(newProduct)
            }
        }else {
            dataProduct.push(newProduct)
        }
    } else {
        count.disabled = true
        dataProduct[indexOfUpdateItem] = newProduct;
        count.disabled = false
        submit.innerHTML = 'create'
    }

    
    // save localstorage
    localStorage.setItem('product' , JSON.stringify(dataProduct))
    console.log(dataProduct);
    // clear data 
    cleareData()
    
    // read data 
    showData()
}

// clear inputs function

const cleareData = ()=> {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category .value= ''
}

// read

const showData = ()=> {
    getTotal()
    const tbody = document.getElementById('tbody')
    let content = ''
    data =  JSON.parse(localStorage.getItem('product'))
    let i = 0
    data.map(element => {
        content += `
        <tr>
            <td>${i}</td>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td>${element.taxes}</td>
            <td>${element.ads}</td>
            <td>${element.discount}</td>
            <td>${element.total}</td>
            <td>${element.category}</td>
            <td><button onclick = "updateItem(${i})" id="update">update</button></td>
            <td><button onclick = "deleteItem(${i})" id="delete">delete</button></td>
        </tr>

        `
        i++
    });
    
    tbody.innerHTML = content;
    const btnDelete = document.getElementById('deleteAll')

    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `
            <button onclick = "deleteAll()">delete All (${dataProduct.length})</button>
        `
    } else {
        btnDelete.innerHTML = ''
    }

}

showData()

// count
// delete

const deleteItem = (index)=> {
    dataProduct.splice(index, 1)
    localStorage.product =  JSON.stringify(dataProduct)
    showData()
}

// update

const updateItem = (index) => {
    oldItem = dataProduct[index]
    title.value = oldItem.title;
    price.value = oldItem.price
    taxes.value = oldItem.taxes
    ads.value = oldItem.ads
    discount.value = oldItem.discount
    getTotal()
    category.value = oldItem.category
    submit.innerHTML = 'Update'
    mod = 'update'
    scroll({
        top:0,
        behavior: "smooth",
    })
}

// search
let searchType = 'title'

const searchItem = (id) => {
    console.log(id);
    searchInput = document.getElementById('search')
    if (id == 'searchTitle') {
        searchType = 'title'
        searchInput.placeholder = 'Search By Title'
    } else {
        searchType = 'category'
        searchInput.placeholder = 'Search By Category'
    }
    searchInput.focus()
}

const searchData = (value) => {
    if (searchType == 'title') {
        dataFinded = dataProduct.filter(item => item.title.includes(value)==true)
        console.log(dataFinded);
    } else {
        dataFinded = dataProduct.filter(item => item.category.includes(value)==true)
        console.log(dataFinded);
    }
}
// clean data

const deleteAll = () => {
    dataProduct = []
    localStorage.product =  JSON.stringify(dataProduct)
    showData()
}

