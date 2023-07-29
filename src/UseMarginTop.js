import { makeStyles } from "@material-ui/core/styles";

const useMarginTop = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4), // Add top margin of 16px
  },
}));

export default useMarginTop;