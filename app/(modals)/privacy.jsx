import ThemedText from "@/components/theme/ThemedText";
import { Linking, ScrollView, View } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import Header from "../../components/common/Header";
const PrivacyPolicyScreen = () => {
  return (
    <SafeScreen paddingHorizontal>
      <Header title="Privacy Policy" showBackButton />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <ThemedText style={{ marginBottom: 20 }}>
          Last updated: July 18, 2025
        </ThemedText>

        <ThemedText style={{ marginBottom: 10 }}>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </ThemedText>

        <ThemedText style={{ marginBottom: 10 }}>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </ThemedText>

        <ThemedText
          style={{ color: "blue", marginBottom: 20 }}
          onPress={() =>
            Linking.openURL(
              "https://www.termsfeed.com/privacy-policy-generator/"
            )
          }>
          Generated with TermsFeed Privacy Policy Generator
        </ThemedText>

        <ThemedText style={styles.heading}>
          Interpretation and Definitions
        </ThemedText>
        <ThemedText style={styles.subheading}>Interpretation</ThemedText>
        <ThemedText style={styles.paragraph}>
          Capitalized words have meanings defined below. These definitions apply
          regardless of singular or plural form.
        </ThemedText>

        <ThemedText style={styles.subheading}>Definitions</ThemedText>
        {[
          [
            "Account",
            "A unique account created for You to access our Service.",
          ],
          [
            "Affiliate",
            "An entity that controls, is controlled by or is under common control with a party.",
          ],
          [
            "Application",
            "BB Pancakes, the software program provided by the Company.",
          ],
          ["Company", 'Refers to BB Pancakes ("We", "Us", or "Our").'],
          ["Country", "Refers to: Texas, United States"],
          [
            "Device",
            "Any device that can access the Service (computer, phone, tablet).",
          ],
          [
            "Personal Data",
            "Any information that relates to an identifiable individual.",
          ],
          ["Service", "Refers to the Application."],
          [
            "Service Provider",
            "Any third party who processes data on behalf of the Company.",
          ],
          [
            "Usage Data",
            "Data collected automatically, such as time spent on a page or IP address.",
          ],
          [
            "You",
            "The individual using the Service, or the entity they represent.",
          ],
        ].map(([term, def], index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <ThemedText style={styles.bold}>{term}:</ThemedText>
            <ThemedText>{def}</ThemedText>
          </View>
        ))}

        <ThemedText style={styles.heading}>
          Collecting and Using Your Personal Data
        </ThemedText>

        <ThemedText style={styles.subheading}>
          Types of Data Collected
        </ThemedText>
        <ThemedText style={styles.bold}>Personal Data</ThemedText>
        <ThemedText>
          We may collect identifiable info like your email address and usage
          data.
        </ThemedText>

        <ThemedText style={styles.bold}>Usage Data</ThemedText>
        <ThemedText>
          This includes info such as your device’s IP address, browser version,
          pages visited, and time spent on pages. When using a mobile device, we
          may also collect device type, OS, and other diagnostics.
        </ThemedText>

        <ThemedText style={styles.subheading}>Use of Your Data</ThemedText>
        {[
          "To provide and maintain our Service",
          "To manage Your Account",
          "To fulfill a contract",
          "To contact You with updates or support",
          "To send relevant news or offers (opt-out anytime)",
          "To manage support requests",
          "For business transfers (e.g., mergers)",
          "To improve our services and user experience",
        ].map((item, i) => (
          <ThemedText key={i}>• {item}</ThemedText>
        ))}

        <ThemedText style={styles.subheading}>
          Sharing Your Information
        </ThemedText>
        {[
          "With Service Providers",
          "With Affiliates",
          "With Business Partners",
          "With other users (in public areas)",
          "With Your consent",
        ].map((item, i) => (
          <ThemedText key={i}>• {item}</ThemedText>
        ))}

        <ThemedText style={styles.subheading}>Retention & Deletion</ThemedText>
        <ThemedText>
          We retain personal data only as long as needed. You may request
          deletion of your data, except where we’re legally required to keep it.
        </ThemedText>

        <ThemedText style={styles.subheading}>Data Transfers</ThemedText>
        <ThemedText>
          Your info may be transferred across regions. We ensure data protection
          is in place wherever your data goes.
        </ThemedText>

        <ThemedText style={styles.subheading}>Your Rights</ThemedText>
        <ThemedText>
          You may update or delete your data at any time from your account
          settings, or by contacting us.
        </ThemedText>

        <ThemedText style={styles.subheading}>Security</ThemedText>
        <ThemedText>
          We use reasonable means to protect your info, but no method is 100%
          secure.
        </ThemedText>

        <ThemedText style={styles.heading}>Children’s Privacy</ThemedText>
        <ThemedText>
          We do not knowingly collect information from anyone under 13. If your
          child has provided data, please contact us to remove it.
        </ThemedText>

        <ThemedText style={styles.heading}>Third-Party Links</ThemedText>
        <ThemedText>
          Our app may link to other websites. We are not responsible for their
          content or privacy practices.
        </ThemedText>

        <ThemedText style={styles.heading}>Policy Changes</ThemedText>
        <ThemedText>
          We may update this Privacy Policy from time to time. Changes are
          effective once posted.
        </ThemedText>

        <ThemedText style={styles.heading}>Contact Us</ThemedText>
        <ThemedText>
          If you have any questions, sorry. We're working on getting a business
          email.
        </ThemedText>
        <ThemedText style={{ marginTop: 5, fontWeight: "bold" }}></ThemedText>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = {
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
};

export default PrivacyPolicyScreen;
