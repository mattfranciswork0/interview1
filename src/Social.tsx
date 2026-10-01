import { useEffect, useState } from "react";
import Details from "./Details";
import Sidebar from "./Sidebar";
const URL = "https://dummyjson.com/posts?limit=10";
const MOCK = {
  posts: [
    {
      id: 1,
      title: "His mother had always taught him",
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      tags: ["history", "american", "crime"],
      reactions: {
        likes: 192,
        dislikes: 25,
      },
      views: 305,
      userId: 121,
    },
    {
      id: 2,
      title: "He was an expert but not in a discipline",
      body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
      tags: ["french", "fiction", "english"],
      reactions: {
        likes: 859,
        dislikes: 32,
      },
      views: 4884,
      userId: 91,
    },
    {
      id: 3,
      title: "Dave watched as the forest burned up on the hill.",
      body: "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
      tags: ["magical", "history", "french"],
      reactions: {
        likes: 1448,
        dislikes: 39,
      },
      views: 4152,
      userId: 16,
    },
    {
      id: 4,
      title: "All he wanted was a candy bar.",
      body: "All he wanted was a candy bar. It didn't seem like a difficult request to comprehend, but the clerk remained frozen and didn't seem to want to honor the request. It might have had something to do with the gun pointed at his face.",
      tags: ["mystery", "english", "american"],
      reactions: {
        likes: 359,
        dislikes: 18,
      },
      views: 4548,
      userId: 47,
    },
    {
      id: 5,
      title: "Hopes and dreams were dashed that day.",
      body: "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
      tags: ["crime", "mystery", "love"],
      reactions: {
        likes: 119,
        dislikes: 30,
      },
      views: 626,
      userId: 131,
    },
    {
      id: 6,
      title: "Dave wasn't exactly sure how he had ended up",
      body: "Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.",
      tags: ["english", "classic", "american"],
      reactions: {
        likes: 15,
        dislikes: 8,
      },
      views: 38,
      userId: 98,
    },
    {
      id: 7,
      title: "This is important to remember.",
      body: "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
      tags: ["magical", "crime"],
      reactions: {
        likes: 127,
        dislikes: 26,
      },
      views: 168,
      userId: 70,
    },
    {
      id: 8,
      title: "One can cook on and with an open fire.",
      body: "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it.",
      tags: ["american", "english"],
      reactions: {
        likes: 1271,
        dislikes: 36,
      },
      views: 2116,
      userId: 67,
    },
    {
      id: 9,
      title: "There are different types of secrets.",
      body: "There are different types of secrets. She had held onto plenty of them during her life, but this one was different. She found herself holding onto the worst type. It was the type of secret that could gnaw away at your insides if you didn't tell someone about it, but it could end up getting you killed if you did.",
      tags: ["american", "history", "magical"],
      reactions: {
        likes: 703,
        dislikes: 18,
      },
      views: 2235,
      userId: 82,
    },
    {
      id: 10,
      title: "They rushed out the door.",
      body: "They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind. Everything was thrown into the car and they sped off. Thirty minutes later they were safe and that was when it dawned on them that they had forgotten the most important thing of all.",
      tags: ["fiction", "magical", "history"],
      reactions: {
        likes: 455,
        dislikes: 3,
      },
      views: 4504,
      userId: 144,
    },
  ],
  total: 251,
  skip: 0,
  limit: 10,
};

const Social = () => {
  const [posts, setPosts] = useState(MOCK.posts);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [userReactions, setUserReactions] = useState({}); // { [postId]: "likes" | "dislikes" }
  const selectedPost = posts.find((post) => post.id === selectedPostId);

  //   const onClickSelectedPost = (postId) => {
  //     setSelectedPost(posts.filter((post) => post.id === postId)[0]);
  //   };
  //   useEffect(() => {
  //     const getPosts = async () => {
  //       try {
  //         const res = await fetch(URL);
  //         const data = await res.json();
  //         setPosts(data);
  //       } catch (err) {
  //         console.log("err", err);
  //       }
  //     };

  //     getPosts();
  //   }, []);

  //   const selectedPost = posts.find((post) => post.id === selectedPostId);

  const handleReaction = (postId, clickedType) => {
    const currentReaction = userReactions[postId];
    const removingReaction = currentReaction === clickedType;
    setPosts((posts) =>
      posts.map((post) => {
        if (post.id !== postId) return post;

        let { likes, dislikes } = post.reactions;

        if (currentReaction === "likes") likes -= 1;
        if (currentReaction === "dislikes") dislikes -= 1;

        if (!removingReaction) {
          if (clickedType === "likes") likes += 1;
          if (clickedType === "dislikes") dislikes += 1;
        }

        return { ...post, reactions: { ...post.reactions, likes, dislikes } };
      }),
    );

    setUserReactions((prev) => ({
      ...prev,
      [postId]: removingReaction ? null : clickedType,
    }));
  };

  return (
    <div>
      {selectedPost ? (
        <Details
          userReaction="likes"
          handleReaction={handleReaction}
          selectedPost={selectedPost}
        />
      ) : (
        <div>No post selected</div>
      )}
      <Sidebar onClickSelectedPost={setSelectedPostId} posts={posts} />
    </div>
  );
};

export default Social;

// function processIntakeRecords(records) {
//   const normalized = records.map(normalizeRecord);
//   const deduped = dedupeByEmail(normalized);

//   const valid = [];
//   const invalid = [];

//   for (const record of deduped) {
//     const errors = validateRecord(record);
//     if (errors.length === 0) {
//       valid.push(record);
//     } else {
//       invalid.push({ record, errors });
//     }
//   }

//   return { valid, invalid };
// }

// // ---- Step 1: Normalize ----

// function normalizeRecord(record) {
//   return {
//     fullName: normalizeName(record.fullName),
//     email: record.email.trim().toLowerCase(),
//     dob: normalizeDate(record.dob),
//     annualIncome: normalizeCurrency(record.annualIncome),
//     state: record.state.trim().toUpperCase(),
//     submittedAt: record.submittedAt,
//   };
// }

// function normalizeName(name) {
//   return name
//     .trim()
//     .toLowerCase()
//     .split(" ")
//     .filter(Boolean)
//     .map((w) => w[0].toUpperCase() + w.slice(1))
//     .join(" ");
// }

// function normalizeDate(dateStr) {
//   if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
//   const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
//   if (!match) return dateStr; // leave as-is; validation will catch it
//   const [, month, day, year] = match;
//   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
// }

// function normalizeCurrency(value) {
//   const cleaned = String(value).replace(/[$,]/g, "");
//   return parseFloat(cleaned);
// }

// // ---- Step 2: Dedupe (keep most recent submission per email) ----

// function dedupeByEmail(records) {
//   const byEmail = new Map();

//   for (const record of records) {
//     const existing = byEmail.get(record.email);
//     if (
//       !existing ||
//       new Date(record.submittedAt) > new Date(existing.submittedAt)
//     ) {
//       byEmail.set(record.email, record);
//     }
//   }

//   return Array.from(byEmail.values());
//Array.from(map.values())   // [1, 2]
//Array.from(map.keys())     // ["a", "b"]
//Array.from(map.entries())  // [["a", 1], ["b", 2]]
//Array.from(new Set([1, 2, 2, 3]));
// [1, 2, 3]
//Array.from("abc");
// ["a", "b", "c"]
// }

// // ---- Step 3: Validate ----

// function validateRecord(record) {
//   const errors = [];

//   if (!record.fullName) errors.push("fullName is required");

//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) {
//     errors.push("email is invalid");
//   }

//   if (isNaN(new Date(record.dob).getTime())) {
//     errors.push("dob is not a valid date");
//   }

//   if (isNaN(record.annualIncome) || record.annualIncome <= 0) {
//     errors.push("annualIncome must be positive");
//   }

//   if (!/^[A-Z]{2}$/.test(record.state)) {
//     errors.push("state must be 2 letters");
//   }

//   return errors;
// }

//Another question:

// const extracted = {
//   fullName: "Ana Lopez",
//   address: "123 Main St",
//   dob: "1990-03-07",
//   ssn: "123456789",
// };

// const formInput = {
//   fullName: "Ana Lopez",
//   address: "456 Oak Ave",   // client moved, document is outdated
//   dob: "1990-03-07",
//   phone: "5125551234",      // only in form, not extracted
// };

// {
//   merged: {
//     fullName: "Ana Lopez",
//     address: "456 Oak Ave",
//     dob: "1990-03-07",
//     ssn: "123456789",
//     phone: "5125551234",
//   },
//   conflicts: [
//     { field: "address", extractedValue: "123 Main St", formValue: "456 Oak Ave" },
//   ],
// }

// function mergeClientData(extracted, formInput) {
//   const merged = {};      // the final combined record we'll return
//   const conflicts = [];   // list of fields where the two sources disagreed

//   // Get every field name that appears in EITHER source, with no duplicates.
//   // We need this because a field might only exist in one of the two objects
//   // (e.g. "phone" is only in formInput, "ssn" is only in extracted).
//   // Using a Set automatically removes duplicate field names.

// new Set(...) takes that one array and builds a Set from it, removing duplicates:
// new Set(["fullName", "address", "dob", "ssn", "fullName", "address", "dob", "phone"])
// Set(5) { "fullName", "address", "dob", "ssn", "phone" }
//new Set("hello")
// Set(4) { "h", "e", "l", "o" }   <- duplicate "l" removed

//   const allFields = new Set([
//     ...Object.keys(extracted),
//     ...Object.keys(formInput),
//   ]);

//   // Go through each field name once, and decide what the merged value should be.
//   for (const field of allFields) {
//     const extractedValue = extracted[field];   // e.g. extracted.address
//     const formValue = formInput[field];        // e.g. formInput.address

//     // Treat undefined, null, AND empty string all as "this source has no value here."
//     // We can't just do `if (extractedValue)` because that would also treat
//     // 0 or false as "missing," which could be wrong for other fields.
//     const hasExtracted = isPresent(extractedValue);
//     const hasForm = isPresent(formValue);

//     // CASE 1: only the form has a value → just use the form's value.
//     if (hasForm && !hasExtracted) {
//       merged[field] = formValue;
//       continue; // move to the next field, nothing more to check
//     }

//     // CASE 2: only the extracted document has a value → use that instead.
//     if (hasExtracted && !hasForm) {
//       merged[field] = extractedValue;
//       continue;
//     }

//     // CASE 3: neither source has a value → skip this field entirely.
//     // (merged simply won't have this key at all)
//     if (!hasExtracted && !hasForm) {
//       continue;
//     }

//     // CASE 4 (the interesting one): BOTH sources have a value.
//     // We need to check if they actually agree or not.
//     if (normalize(extractedValue) === normalize(formValue)) {
//       // They agree (ignoring case/whitespace differences) — no conflict.
//       merged[field] = formValue; // could just as well use extractedValue here
//     } else {
//       // They genuinely disagree. Business rule: the client's own form entry
//       // is trusted more than an OCR-extracted value, so form wins.
//       merged[field] = formValue;

//       // But we still record that a conflict happened, so a human can
//       // review it later — we don't want to silently discard the mismatch.
//       conflicts.push({ field, extractedValue, formValue });
//     }
//   }

//   return { merged, conflicts };
// }

// // Small helper: is this value actually usable, or effectively "missing"?
// function isPresent(value) {
//   return value !== undefined && value !== null && value !== "";
// }

// // Small helper: make two values comparable despite minor formatting
// // differences, e.g. "Ana Lopez" vs "ana lopez " should count as the same.
// function normalize(value) {
//   return String(value).trim().toLowerCase();
// }

// const map = new Map([["a", 1], ["b", 2]]);
// new Set(map.values())
// Set(2) { 1, 2 }

//Another quesiton

const dbRecords = [
  { clientId: "c1", name: "Ana Lopez", email: "ana@x.com", state: "TX" },
  { clientId: "c2", name: "Bob Kim", email: "bob@x.com", state: "CA" },
  { clientId: "c3", name: "Carla Diaz", email: "carla@x.com", state: "NY" },
];

const uploadedRecords = [
  { clientId: "c1", name: "Ana Lopez", email: "ana@x.com", state: "TX" }, // unchanged
  { clientId: "c2", name: "Bob Kim", email: "bobk@x.com", state: "CA" }, // email changed
  { clientId: "c4", name: "Dana White", email: "dana@x.com", state: "FL" }, // new
];

// Expected output:

// {
//   added: [
//     { clientId: "c4", name: "Dana White", email: "dana@x.com", state: "FL" },
//   ],
//   removed: [x
//     { clientId: "c3", name: "Carla Diaz", email: "carla@x.com", state: "NY" },
//   ],
//   updated: [
//     {
//       clientId: "c2",
//       changes: { email: { from: "bob@x.com", to: "bobk@x.com" } },
//     },
//   ],
// }
