import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HotelCard = ({ hotel }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: hotel.photoPath }}
        style={styles.cardImage}
      >
        {isFavourite ? (
          <TouchableOpacity
            style={styles.favouriteIcon}
            onPress={() => {
              setIsFavourite(false);
            }}
          >
            <Icon name="heart" size={30} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsFavourite(true)}>
            <Icon
              name="heart-outline"
              size={30}
              color="white"
              style={{ top: 10, left: 7 }}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            alignSelf: "flex-end",
            padding: 10,
            right: 8,
            backgroundColor: hotel.customerScore < 9.0 ? "orange" : "#738435",
            borderRadius: 8,
            height: "20%",
            bottom: 20,
          }}
        >
          {hotel.customerScore.toFixed(1)}
        </Text>

        <Text style={styles.certificateText}>
          {hotel.hasMinistryOfHealthCertificate}
        </Text>
      </ImageBackground>

      <Text style={styles.cardText}>{hotel.hotelName}</Text>

      <View style={styles.infoContainer}>
        <Icon
          name="pin"
          size={20}
          color="#53A8DB"
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>
          {hotel.areaName} - {hotel.subAreaName} - {hotel.subAreaDetailName}
        </Text>

        <View
          style={{
            right: 30,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {hotel.price.toFixed(2) !== hotel.discountPrice.toFixed(2) && (
              <>
                <Text style={styles.currencyText}>₺ </Text>
                <Text style={styles.priceText}>
                  {hotel.price.toFixed(2).replace(".", ",")}
                </Text>
              </>
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.discountPriceCurrency}>₺ </Text>

            <Text style={styles.discountPriceText}>
              <Text style={{ fontWeight: "600" }}>
                {hotel.discountPrice.toFixed(2).split(".")[0]}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {"," + hotel.discountPrice.toFixed(2).split(".")[1]}
              </Text>
            </Text>
          </View>

          <Text style={{ color: "#B3B3BD" }}>gecelik kişi başı</Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          // width: "35%",
          width: Math.min(hotel.accommodation.length * 8, 300),
          alignItems: "center",
          justifyContent: "center",
          height: 30,
          padding: 2,
          left: 15,
          bottom: 37,
          marginTop: "2%",
        }}
      >
        <Text style={styles.accommodation} numberOfLines={1}>
          {hotel.accommodation}
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", bottom: 30, left: 8, marginTop: "1%" }}
      >
        <Icon
          name="brightness-percent"
          size={20}
          color="#6BC079"
          style={{ left: 8, top: 2 }}
        />
        <Text style={styles.campaignName}>{hotel.campaignName}</Text>
      </View>
    </View>
  );
};

const HomePage = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://gist.githubusercontent.com/yasaricli/de2282f01c739a5c8fcbffbb9116e277/raw/949b2393642747d2f54edf0ce659f27a69c87690/hotels.json?page=${page}&pageSize=${pageSize}`
      );

      //setTotalPages(response.data.resultObject.totalPages);

      setTotalPages(response.data.resultObject);
      console.log("Result: ", response.data.resultObject);

      if (page === 1) {
        setHotelData(response.data.resultObject.hotelList);
      } else {
        setHotelData((prevData) => [
          ...prevData,
          ...response.data.resultObject.hotelList,
        ]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const Seperator = () => (
    <View style={styles.seperatorContainer}>
      <View style={styles.seperator} />
    </View>
  );

  return (
    <SafeAreaProvider>
      <View style={styles.seperatorView}>
        <TouchableOpacity style={styles.sortBtn}>
          <Icon
            name="sort"
            size={20}
            color="#52A8DB"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.sortFilterBtnText}>Sırala</Text>
        </TouchableOpacity>

        <Seperator />

        <TouchableOpacity style={styles.filterBtn}>
          <Icon
            name="filter-variant"
            size={20}
            color="#52A8DB"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.sortFilterBtnText}>Filtrele</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={hotelData}
        keyExtractor={(item) => item.hotelId.toString()}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" />}
        estimatedItemSize={380}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 360,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flexDirection: "column",
    overflow: "hidden",
  },
  cardText: {
    height: 50,
    fontSize: 18,
    color: "#1C4862",
    fontWeight: "500",
    padding: 10,
    left: 5,
  },

  locationText: {
    color: "#9B9BA9",
    width: "80%",
    padding: 10,
    bottom: 16,
    left: 5,
  },

  priceText: {
    color: "#D65846",
    bottom: 5,
    fontSize: 16,
    textDecorationLine: "line-through",
  },

  discountPriceText: {
    color: "#53A8DB",
    fontSize: 20,
    fontWeight: "600",
  },

  accommodation: {
    color: "#204B65",
  },

  // customerScore: {
  //   color: "white",
  //   fontWeight: "bold",
  //   fontSize: 18,
  //   alignSelf: "flex-end",
  //   padding: 10,
  //   right: 8,
  //   backgroundColor: hotel.customerScore < 9.0 ? "orange" : "#738435",
  //   borderRadius: 8,
  //   height: "20%",
  //   bottom: 20,
  // },

  infoContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1%",
    bottom: 5,
  },

  currencyText: {
    color: "#D65846",
    bottom: 1,
    fontSize: 12,
  },

  discountPriceCurrency: {
    color: "#53A8DB",
    fontSize: 16,
    top: 4,
  },

  campaignName: {
    color: "#6BC079",
    padding: 10,
    left: 3,
    bottom: 8,
  },

  locationIcon: {
    bottom: 17,
    left: 15,
  },

  favouriteIcon: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    left: 7,
  },

  certificateText: {
    color: "red",
    zIndex: 999,
  },

  seperatorContainer: {
    height: "100%",
    justifyContent: "center",
  },
  seperator: {
    height: "60%",
    width: 1,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
  seperatorView: {
    flexDirection: "row",
    backgroundColor: "white",
    height: "6%",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },

  sortFilterBtnText: {
    color: "#52A8DB",
    fontWeight: "600",
    fontSize: 16,
  },

  sortBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: 18,
  },

  filterBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    right: 18,
  },
  // flatListContainer: {
  //   flexGrow: 1,
  // },
});

export default HomePage;
