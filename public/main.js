function deleteProduct(id) {
  const result = confirm("Are you sure, you want to delete this product?");
  console.log(result);
  if (result) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        location.reload();
      }
    });
  }
}
