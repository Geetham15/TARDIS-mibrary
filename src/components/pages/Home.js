import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import AddBooks from '../AddBooks'
function Home() {
    return (
        <div>
        <Header/>
             <section className="">
        <div className="grid grid-cols-5  gap-2 mx-5 p-5">
          <div className="border"><h6>New Books</h6>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci facere accusamus obcaecati odit alias. Blanditiis iusto molestiae fugiat molestias odio neque, excepturi reiciendis error alias nihil in nemo odit eos?</div>
          <div className="border"><h6>Lend-A-Book</h6><Card/> </div>
          <div className="border"><h6>Trade-A-Book</h6><Card/> </div>
          <div className="border"><h6>Buy/Sell-A-Book</h6><Card/> </div>
          <div className="border"><h6>Blog</h6> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci facere accusamus obcaecati odit alias. Blanditiis iusto molestiae fugiat molestias odio neque, excepturi reiciendis error alias nihil in nemo odit eos?</div>
        </div>
      </section>
     <AddBooks/>
      <Footer/>
        </div>
    )
}

export default Home
