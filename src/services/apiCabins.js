import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("the cabins could not be loaded");
  }

  return data;
}

//https://neldsjmzfzamofgbjozs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.create/edit new cabin

  //A CREATE
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("the cabins could not be created");
  }
  //2.upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //3.delete the cabin if there was storage error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    if (error) {
      console.error(storageError);
      throw new Error(
        "the cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("the cabins could not be deleted");
  }

  return data;
}
