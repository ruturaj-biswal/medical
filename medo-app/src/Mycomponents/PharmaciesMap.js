import React, { useEffect, useRef } from "react";

export default function PharmaciesMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps not loaded");
      return;
    }

    // Step 1: Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const userLocation = new window.google.maps.LatLng(latitude, longitude);

          // Step 2: Initialize map
          const map = new window.google.maps.Map(mapRef.current, {
            center: userLocation,
            zoom: 14,
          });

          // Add marker for the user's location
          new window.google.maps.Marker({
            position: userLocation,
            map,
            title: "You are here",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
          });

          // Step 3: Use the (still functional) PlacesService API
          const service = new window.google.maps.places.PlacesService(map);

          const request = {
            location: userLocation,
            radius: 3000, // 3 km search radius
            keyword: "pharmacy",
          };

          // Step 4: Perform nearby search
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              results.forEach((place) => {
                const marker = new window.google.maps.Marker({
                  position: place.geometry.location,
                  map,
                  title: place.name,
                });

                const infoWindow = new window.google.maps.InfoWindow({
                  content: `
                    <div style="font-size:14px">
                      <strong>${place.name}</strong><br/>
                      ${place.vicinity || ""}<br/>
                      ⭐ Rating: ${place.rating || "N/A"}<br/>
                      <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        place.name
                      )}" target="_blank">📍 Get Directions</a>
                    </div>
                  `,
                });

                marker.addListener("click", () => infoWindow.open(map, marker));
              });
            } else {
              console.error("Places search failed:", status);
              alert("No nearby pharmacies found.");
            }
          });
        },
        (error) => {
          alert("Please allow location access to find nearby pharmacies.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100vh",
        borderRadius: "10px",
      }}
    ></div>
  );
}
