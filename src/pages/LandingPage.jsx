import React from "react";
import "./LandingPage.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
function LandingPage() {
    return (
        <>
 <NavBar/>
        
        <div class="grid-container">
        
            <div class="header">
                <h2>
                    <h1><strong>About MiBrary</strong></h1>
                </h2>
            </div>
            <div class="left">
                <h2>
                    <b>
                        <u>Problem Finding A Book:</u>
                    </b>
                </h2>
                <p>
                    <p>
                        Have you ever wanted to read a book but could not find
                        it in the public library? Or perhaps the only place you
                        could find it was in a local or online bookstore, but
                        all you wanted to do was to borrow and read it, not
                        purchase it.
                    </p>
                    <br></br>
                    <p>
                        Or maybe you were desperately looking for a classic
                        novel that is no longer in print. Surely, someone near
                        you must have it. But how would you go about looking for
                        it? You could send a message on social media to ask if
                        anyone has the book you are looking for. Good luck
                        getting any response from people who do not even know
                        you!
                    </p>
                    <br></br>
                    <p>
                        What about if there was an easy way for you to find the
                        book somewhere near you that someone was willing to lend
                        out?
                    </p>
                </p>
            </div>
            <div class="middle">
                {" "}
                <h2>
                    <b>
                        <u>Less Than Ideal Solution:</u>
                    </b>
                </h2>
                <p>
                    <p>
                        You may have seen or even used the community book
                        sharing boxes where people place books they no longer
                        need for anyone interested to take home.
                    </p>

                    <br></br>
                    <p>
                        While the community book box is an excellent idea, it
                        has a few drawbacks; firstly, most of them are not large
                        enough to hold the books people would like to give away.{" "}
                    </p>
                    <br></br>
                    <p>
                        Another issue is that you will not know which books are
                        in the boxes until you inspect them physically.
                    </p>
                    <br></br>
                    <p>
                        Who has the time to go from box to box hoping by some
                        chance to find a particular book? If there was a way to
                        record and catalog all the books in the boxes, it would
                        be of greater benefit, but the work involved in
                        maintaining such a system is not trivial.
                    </p>
                    <br></br>
                    <p>
                        Welcome to <b>MiBrary</b>, a web application that
                        features an online community based, non-centralized used
                        book library system where users can register as members
                        and browse from a collection of privately held books in
                        and around the city.
                    </p>
                </p>
            </div>
            <div class="right">
                <h2>
                    <b>
                        <u>The Ultimate Solution:</u>
                    </b>
                </h2>
                <p>
                    <p>
                        <b>MiBrary</b> facilitates the search of books by Title
                        or ISBN and returns the geographic locations of the
                        personal collections. Book owners willing to lend their
                        books can add comments such as the physical condition of
                        the books, duration of lease, and other relevant
                        comments to assist borrowers in deciding whether to
                        borrow from the lenders. Borrowers can then contact the
                        book owner and arrange for a mutually agreed (safe)
                        collection point.
                    </p>

                    <br></br>
                    <p>
                        It is anticipated that this system will alleviate the
                        problem of books being sent to the landfills, encourage
                        readership, and promote a community spirit of sharing
                        and exchanging books. Students may be able to use this
                        to share or pass on books for subjects or courses they
                        have already completed. Children’s story books may be
                        lent out by parents whose children have outgrown the
                        books.
                    </p>
                </p>
            </div>

            {/* <Footer/> */}
        </div>
        </>
   
    );
}

export default LandingPage;
