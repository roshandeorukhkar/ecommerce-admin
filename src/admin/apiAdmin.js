import { API } from '../config';


export const createCategory = async (category) => {
    try {
        const response = await fetch(`${API}/category/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
/*export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
*/

export const statusCategory = (categoryId, category) => {
    return fetch(`${API}/category/status/${categoryId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusChangeCategory = (categoryId, category) => {
    return fetch(`${API}/category/statusChange/${categoryId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCategory = (categoryId, category) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
           // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
/*
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; */
export const deletecategory1 = (productId) => 
{
    console.log(productId)
    return fetch(`${API}/category/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
};

export const deletecategory = (categoryId, category) => {
    return fetch(`${API}/categorys/delete/${categoryId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deletecategorytest = (categoryId) => 
{
   // console.log(productId)
    return fetch(`${API}/categorys/${categoryId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
};
/*
export const deleteSpecification = (productId) => {
    return fetch(`${API}/Specification/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
};

*/ // new product that use in useform 
export const createProduct = (token, product) => {
  //  console.log(product);
    return fetch(`${API}/product/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

// export const createProduct = (token, product) => {
//     return fetch(`${API}/product/create/`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: product
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getSubCategory = categoryId => {
    return fetch(`${API}/subcategory/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//  export const listOrders = (userId, token) => {
//     return fetch(`${API}/order/list/${userId}`, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
// old commit 
export const listOrders = () => {
    return fetch(`${API}/order/list/`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
          //  Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createManufacturer = async (manufacture) => {
    try {
        const response = await fetch(`${API}/manufacturer/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(manufacture)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
export const getManufacturer = manufacturerId => {
    return fetch(`${API}/manufacturer/${manufacturerId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getManufacturers = () => {
    return fetch(`${API}/manufacturer`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateManfacturer = (manufacturerId, manufacturs) => {
    return fetch(`${API}/manufacturer/${manufacturerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
           // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(manufacturs)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusManfacturer = (manufacturerId, manufactures) => {
    return fetch(`${API}/manufacturer/status/${manufacturerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(manufactures)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusChangeManfacturer = (manufacturerId, manufacturers) => {
    return fetch(`${API}/manufacturer/statusChange/${manufacturerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(manufacturers)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteManufacturer1 = (productId, category) => {
    return fetch(`${API}/manufacturer/delete/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteManufacturer = (manufacturerId) => {
    return fetch(`${API}/manufacturer/${manufacturerId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId) => {
    return fetch(`${API}/product/${productId}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
           // Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
// old update product
export const updateProducttest = (productId, product) => {
    return fetch(`${API}/product/${productId}/`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            //Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateProduct = (productId, product) => {
    //  console.log(product);
      return fetch(`${API}/product/${productId}/`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
          },
          body: JSON.stringify(product)
      })
          .then(response => {
              return response.json();
          })
          .catch(err => {
              console.log(err);
          });
  };


export const createspecification = async (category) => {
    try {
        const response = await fetch(`${API}/specification/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
/*
export const createspecification = async (category) => {

    try {
        const response = await fetch(`${API}/specification/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
*/
export const updatespecification = (productId, category) => {
    return fetch(`${API}/Specification/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
           // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getSpecification = productId => {
    return fetch(`${API}/specification/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const Specification = () => {
    return fetch(`${API}/specification?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteSpecification = (productId) => {
    return fetch(`${API}/specification/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
};

export const deleteSpecificationSoft = (productId, category) => {
    return fetch(`${API}/specification/delete/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusSpecification = (productId, specification) => {
    return fetch(`${API}/specification/status/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(specification)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusChangeSpecification = (productId, specification) => {
    return fetch(`${API}/specification/statusChange/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(specification)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// show all user
export const getCoustomer = () => {
    return fetch(`${API}/cust?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCust = productId => {
    return fetch(`${API}/cust/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCustomer = (productId, category) => {
    return fetch(`${API}/cust/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
           // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteCustomer = (productId, category) => {
    return fetch(`${API}/cust/delete/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const removeCustomer = (productId) => {
    return fetch(`${API}/cust/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const statusCustomer = (productId, category) => {
    return fetch(`${API}/cust/status/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const statusCheckCustomer = (productId, category) => {
    return fetch(`${API}/cust/statusCheck/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//create Attribute API //
export const createAttribute = async (attribute) => {
    try {
        const response = await fetch(`${API}/attribute/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(attribute)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const getAttributes = () => {
    return fetch(`${API}/attribute`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getDimanstions = attributeId => {
    return fetch(`${API}/attribute/${attributeId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getAttribute = attributeId => {
    return fetch(`${API}/attribute/${attributeId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateAttribute = (attributeId, attribute) => {
    return fetch(`${API}/attribute/${attributeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
           // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(attribute)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteAttributeone = (attributeId, category) => {
    return fetch(`${API}/attribute/delete/${attributeId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteAttribute = (attributeId) => {
    return fetch(`${API}/attribute/${attributeId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const statusAttributes = (attributeId, attributes) => {
    return fetch(`${API}/attribute/status/${attributeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(attributes)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const statusChangeAttributes = (attributeId, attributes) => {
    return fetch(`${API}/attribute/statusChange/${attributeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(attributes)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};