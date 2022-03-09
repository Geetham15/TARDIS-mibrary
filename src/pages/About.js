import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import PaginationComponent from '../components/PaginationComponent'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



export default function About() {
  return (
    <>
    
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Item>
              <Item>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24, textAlign: "center" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <h1>Welcome to MiBrary</h1>
                    <blockquote> 'where the world is your library'</blockquote>
                  </Typography>
                  <Typography variant="h5" component="div">
                    <h1 className="text-center">
                      <strong>The Problem</strong>
                    </h1>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <p>
                      Want to read a book but could not find it in the public
                      library, local or online bookstore?
                    </p>
                  </Typography>
                  <Typography variant="body1">
                    <p>
                      {
                        "all you wanted to do was to borrow and read it, not purchase it."
                      }
                    </p>

                    <br />
                  </Typography>
                  <Typography>
                    <p>
                      Looking for a classic novel that is no longer in print.
                    </p>{" "}
                    <p>Surely, someone near you must have it.</p>{" "}
                    <p>But how would you go about looking for it?</p>{" "}
                    <p>
                      You could send a message on social media to ask if anyone
                      has the book you are looking for.
                    </p>{" "}
                    <p>
                      Good luck getting any response from people who do not even
                      know you!
                    </p>
                    <p>
                      What about if there was an easier way for you to find the
                      book somewhere near you that someone was willing to lend
                      out?
                    </p>
                  </Typography>
                </CardContent>
              </Item>
              <CardActions>
                <Button>Next</Button>
              </CardActions>
            </Item>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Item>
              <Item>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24, textAlign: "center" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <h1 className="text-center">
                      <strong>Not Ideal solution</strong>
                    </h1>
                    <br />
                  </Typography>
                  <Typography component="div">
                    <p>
                      You may have seen or even used the community book sharing
                      boxes
                    </p>{" "}
                    <br />{" "}
                    <p>
                      where people place books they no longer need for anyone
                      interested to take home.
                    </p>
                  </Typography>
                  <br />
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <p>While the community book box is an excellent idea </p>
                    <br /> <p>It has a few drawbacks</p>
                    <br />
                    <p>
                      Firstly, most of them are not large enough to hold the
                      books people would like to give away.
                    </p>
                  </Typography>
                  <Typography variant="body1">
                    <p>
                      Another issue is that you will not know which books are in
                      the boxes until you inspect them physically.
                    </p>

                    <br />
                  </Typography>
                  <Typography>
                    <p>
                      Who has the time to go from box to box hoping by some
                      chance to find a particular book?
                    </p>
                    <br />{" "}
                    <p>
                      If there was a way to record and catalog all the books in
                      the boxes, it would be of greater benefit
                      <p>
                        But the work involved in maintaining such a system is
                        not trivial.
                      </p>
                    </p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    href="/about/non-ideal"
                    size="large"
                    float="right"
                  >
                    Next
                  </Button>
                </CardActions>
              </Item>
            </Item>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Item>
              <Item>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24, textAlign: "center" }}
                    color="text.secondary"
                    gutterBottom
                  ></Typography>
                  <Typography variant="h5" component="div">
                    <h1 className="text-center">
                      <strong>The Solution</strong>
                    </h1>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <p>
                      Welcome to <strong>MiBrary</strong>
                    </p>
                    <p>
                      A web application that features an online community based,
                      non-centralized used book library system
                    </p>{" "}
                    <br />{" "}
                    <p>
                      where users can register as members and browse from a
                      collection of privately held books in and around the city.
                    </p>
                    <br />
                  </Typography>
                  <Typography variant="body1">
                    <p>
                      <strong>MiBrary</strong> facilitates the search of books
                      by Title or ISBN and returns the geographic locations of
                      the personal collections.
                    </p>
                    <br />{" "}
                    <p>
                      Book owners willing to lend their books can add comments
                      such as the physical condition of the books, duration of
                      lease, and other relevant comments to assist borrowers in
                      deciding whether to borrow from the lenders.
                    </p>{" "}
                    <br />
                    <p>
                      Borrowers can then contact the book owner and arrange for
                      a mutually agreed (safe) collection point.
                    </p>
                    <br />
                  </Typography>
                  <Typography>
                    <p>
                      It is anticipated that this system will alleviate the
                      problem of books being sent to the landfills, encourage
                      readership, and promote a community spirit of sharing and
                      exchanging books.{" "}
                    </p>{" "}
                    <br />{" "}
                    <p>
                      Students may be able to use this to share or pass on books
                      for subjects or courses they have already completed.
                    </p>
                    <br />
                    <p>
                      Children’s story books may be lent out by parents whose
                      children have outgrown the books.
                    </p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    href="/about/non-ideal"
                    size="large"
                    float="right"
                  >
                    Next
                  </Button>
                </CardActions>
              </Item>
            </Item>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
    </>
  );
}
