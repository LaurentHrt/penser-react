import React, { Component } from "react"
import "./App.css"

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7",
  },
]

class ProductRow extends Component {
  render() {
    const product = this.props.product
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    )
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
}

class ProductCategoryRow extends Component {
  render() {
    return (
      <tr>
        <td colSpan="2">{this.props.category}</td>
      </tr>
    )
  }
}

class ProductTable extends Component {
  render() {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    const rows = []
    let lastCategory = null

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return
      }
      if (inStockOnly && !product.stocked) {
        return
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        )
      }
      rows.push(<ProductRow product={product} key={product.name} />)
      lastCategory = product.category
    })

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class SearchBar extends Component {
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.isStockOnly}
            onChange={(e) => this.props.onInStockChange(e.target.checked)}
          />{" "}
          Only show products in stock
        </p>
      </form>
    )
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = { filterText: "", inStockOnly: false }
  }

  // Arrow for fx binding
  handleFilterTextChange = (filterText) => {
    this.setState({ filterText: filterText })
  }

  // Arrow for fx binding
  handleInStockChange = (inStockOnly) => {
    this.setState({ inStockOnly: inStockOnly })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return <FilterableProductTable products={PRODUCTS} />
  }
}

export default App
