import { ProtectedRoute } from "components/Authentication";
import FormGroup from "components/FormGroup";
import { IconPlay } from "components/Icons";
import { Image } from "components/Image";
import Input from "components/Input";
import Label from "components/Label";
import Meta from "components/Meta";
import axiosClient from "configs/axiosClient";
import { resizeImageLoklok } from "constants/global";
import { PATH } from "constants/path";
import { addDoc, collection } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import LayoutPrimary from "layouts/LayoutPrimary";
import { db } from "libs/firebase-app";
import SearchMovieTogether from "modules/SearchMovieTogether";
import styles from "modules/WatchAnthology/watchAnthology.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import { IMovieDetails, IRoomInfo } from "types";

const WatchTogetherCreate = () => {
  const router = useRouter();
  const [isModeAdd, setIsModeAdd] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [values, setValues] = useState<Omit<IRoomInfo, "id"> | null>(null);
  const { onChange } = useInputChange(values, setValues);
  const handleAddNewRoom = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in!");
      return;
    }
    if (!values?.title) {
      toast.error("Please input title room!");
      return;
    }
    try {
      const colRef = collection(db, "rooms");
      const doc = await addDoc(colRef, values);
      console.log("doc: ", doc.id);
      router.push(`${PATH.together}/${doc.id}`);
      toast.success("Add new room together successfully!");
    } catch (error: any) {
      console.log("error: ", error);
      toast.error(error?.message);
    } finally {
    }
  };

  useEffect(() => {
    const fetchDetailsMovie = async () => {
      if (!values?.movieId || !values.categoryId) return;
      try {
        const { data } = await axiosClient.get(`/api/episode`, {
          params: { id: values?.movieId, category: values?.categoryId }
        });
        setMovieDetails(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchDetailsMovie();
  }, [values?.movieId, values?.categoryId]);

  return (
    <ProtectedRoute>
      <LayoutPrimary>
        <Meta title="Watch together create - WeFlixx" />
        <div className="container">
          {isModeAdd ? (
            <div className="together-add">
              <div className="together-information">
                <h1 className="together-heading">Movie Information</h1>
                <Image
                  src={resizeImageLoklok(values?.thumbnail as string, 500, 282)}
                  alt={movieDetails?.name}
                  className="together-thumbnail"
                />
                <h3 className="together-title">{movieDetails?.name}</h3>
                <p className="together-desc">{movieDetails?.introduction}</p>
              </div>
              <form onSubmit={handleAddNewRoom}>
                <h1 className="together-heading">Room Settings</h1>
                <FormGroup>
                  <Label htmlFor="title">Title room (optional)</Label>
                  <Input
                    name="title"
                    placeholder="Input title room"
                    defaultValue={"Watch " + values?.title + " with me"}
                    onChange={onChange}
                  />
                </FormGroup>
                {Number(movieDetails?.episodeVo?.length) > 1 && (
                  <>
                    <FormGroup>
                      <Label>Episode (default episode 1)</Label>
                    </FormGroup>
                    <div className={styles.anthology}>
                      {movieDetails?.episodeVo.map(({ seriesNo, id }) => {
                        const active = id === Number(values?.episodeId);
                        const handleClickEpisode = (episode: number) => {
                          if (!values) return;
                          setValues({ ...values, episodeId: episode.toString() });
                        };
                        return (
                          <div key={id}>
                            <button type="button" onClick={() => handleClickEpisode(id)}>
                              {active ? <IconPlay fill="#8a3cff" /> : seriesNo}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                <button type="submit" className="together-submit" style={{ marginTop: "20px" }}>
                  Add New Room
                </button>
              </form>
            </div>
          ) : (
            <SearchMovieTogether setIsModeAdd={setIsModeAdd} setValues={setValues} />
          )}
        </div>
      </LayoutPrimary>
    </ProtectedRoute>
  );
};

export default WatchTogetherCreate;
