import type { NextPage } from "next";
import Card from "../components/card";
import Seo from "../components/seo";

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Crypto literature" description="Crypto literature" />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        currentBid="50 ETH"
        endingIn="05h 12m 45s"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        soldFor="50 ETH"
        ownedBy="James Hood"
        ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        uploadedIn="5 June 2020"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        ownedBy="James Hood"
        ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        reservePrice="50 ETH"
        listedBy="James Maxwell"
        listedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <div>Crypto Literature</div>
    </>
  );
};

export default Home;
