import React from 'react'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-dark ">
    <div class="container-fluid ">
      <a class="navbar-brand text-light" href="/">Kuldeep Blogs</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-light " aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="/about">About</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Blogs
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item " href="/blogs">Blogs</a></li>
              <li><a class="dropdown-item " href="/trending">Trending</a></li>
              <li><a class="dropdown-item " href="/recent">Recently Uploaded</a></li>
              <li><hr class="dropdown-divider"/></li>
              <li><a class="dropdown-item" href="/more">More</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="/contact">Contact</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <a href='/login' class="btn btn-outline-primary ms-2" type="submit">Login</a>
        <a href='/signup'  class="btn btn-outline-warning ms-2" type="submit">Sign Up</a>
      </div>
    </div>
  </nav>
  )
}

export default Navbar