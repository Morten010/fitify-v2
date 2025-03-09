export type WorkoutPageProps = {
  type: "information" | "day";
  index: Number;
};

export type WorkoutDayProps = {
  name: string;
  exercises: {
    name: string;
    reps: string;
    sets: string;
    video_url: string;
  }[];
};
