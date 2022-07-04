from zef import *
from zef.ops import *




@func(g)
def setupGraph(data_g):
    if length(data_g | now | all[ET.DefaultCategory]) == 0:
        # ...
        {ET.DefaultCategory: {
            RT.Name: "Transportation",
            RT.Icon: "🚂"
        }} | data_g | run


@func(g)
def userCreate(z):
    print("UserCreate was run")
    # Assign the users some categories by default.
    data_g = Graph(z)

    for def_cat in data_g | now | all[ET.DefaultCategory]:
        new_cat = {ET.Category: {
            RT.Name: def_cat | F.Name | collect,
            RT.Icon: def_cat | F.Icon | collect,
            RT.User: z,
        }} | data_g | run
