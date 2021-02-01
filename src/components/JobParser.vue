<template>
  <v-expansion-panels
    v-model="panel"
    multiple
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              Inputs
            </v-col>
            <v-col
              cols="8"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  Copy and paste the job description and your CV
                </span>
                <span
                  v-else
                  key="1"
                >
                  JD: <v-icon v-if="jd.length > 0" color="success">mdi-check</v-icon><v-icon v-else color="error">mdi-close</v-icon>
                  CV: <v-icon v-if="cv.length > 0" color="success">mdi-check</v-icon><v-icon v-else color="error">mdi-close</v-icon>
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="jobTitle"
              :items="jobTitles"
              label="Job Title"
              outlined
              dense
              hide-details="auto"
              @blur="$v.jobTitle.$touch()"
              :error-messages="validationErrors($v.jobTitle, 'Job Title')"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-textarea
              v-model="jd"
              label="Job Description"
              outlined
              hide-details="auto"
              @blur="$v.jd.$touch()"
              :error-messages="validationErrors($v.jd, 'Job Description')"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-textarea
              v-model="cv"
              label="CV"
              outlined
              hide-details="auto"
              @blur="$v.cv.$touch()"
              :error-messages="validationErrors($v.cv, 'CV')"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn
              class="float-right"
              color="teal"
              :dark="!loading"
              :disabled="loading"
              @click="parseAndMatch"
            >Run</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col cols="4">
            Results
          </v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span>
                Skills Matched: {{ matchPercentage }}%
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row class="justify-center">
          <v-col cols="12" md="4">
            <doughnut-chart
              :labels="['Matched', 'Unmatched']"
              :data="[matchedSkills.length, (uniqueSkills.length-matchedSkills.length)]"
              :colors="['#419A1C', '#E0E0E0']"
              :text="matchPercentage+'%'"
              :styles="doughnutChartStyles"
            ></doughnut-chart>
          </v-col>
        
          <v-col cols="12">
            <v-simple-table dense>
              <thead>
                <tr>
                  <th 
                    v-for="(header, index) in headers" 
                    :key="index"
                    :width="header.width"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(requirement, index) in requirements">
                  <tr v-if="requirement.matched && requirement.matched.length < 1" :key="'req'+index">
                    <td>{{ requirement.text }}</td>
                    <td>
                      <v-chip
                        class="ma-1 pa-3"
                        color="error"
                        dark
                        v-for="(kw, index) in requirement.unmatched.keywords"
                        :key="'kw' + index"
                      >
                        {{ kw }}
                      </v-chip>
                      <v-chip
                        class="ma-1 pa-3"
                        color="error"
                        v-for="(label, index) in requirement.unmatched.classes"
                        :key="'class' + index"
                      >
                        {{ label }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr v-else-if="requirement.matched" v-for="(match, mIndex) in requirement.matched" :key="'match-'+index+'-'+mIndex">
                    <td v-if="mIndex === 0" :rowspan="requirement.matched.length">{{ requirement.text }}</td>
                    <td v-if="mIndex === 0" :rowspan="requirement.matched.length">
                      <v-chip
                        class="ma-1 pa-3"
                        color="error"
                        dark
                        v-for="(kw, index) in requirement.unmatched.keywords"
                        :key="'kw' + index"
                      >
                        {{ kw }}
                      </v-chip>
                      <v-chip
                        class="ma-1 pa-3"
                        color="error"
                        dark
                        v-for="(label, index) in requirement.unmatched.classes"
                        :key="'class' + index"
                      >
                        {{ label }}
                      </v-chip>
                    </td>
                    <td>{{ match.text }}</td>
                    <td>
                      <v-chip
                        class="ma-1 pa-3"
                        color="indigo"
                        dark
                        v-for="(kw, index) in match.keywords"
                        :key="'kw' + index"
                      >
                        {{ kw }}
                      </v-chip>
                      <v-chip
                        class="ma-1 pa-3"
                        color="indigo"
                        dark
                        v-for="(label, index) in match.classes"
                        :key="'class' + index"
                      >
                        {{ label }}
                      </v-chip>
                    </td>
                  </tr>
                </template>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'JobParser',
  mixins: [validationMixin],
  components: {
    DoughnutChart
  },
  data() {
    return {
      loading: false,
      error: null,

      panel: [0],
      jobTitles: ['Software Engineer'],

      jobTitle: null,
      jd: '',
      cv: '',
      requirements: null,

      headers: [
        { text: 'Requirement', width: '250px' },
        { text: 'Unmatched Skills', width: '250px' },
        { text: 'Matching Experience', width: '250px' },
        { text: 'Matched Skills', width: '250px' },
      ],
    }
  },
  computed: {
    uniqueSkills() {
      var uniqueSkills = [];
      if (this.requirements) {
        this.requirements.forEach(req => {
          if (req.matched) {
            req.matched.forEach(match => {
              match.classes.forEach(label => {
                if (!uniqueSkills.includes(label)) {
                  uniqueSkills.push(label);
                }
              });
              
              match.keywords.forEach(kw => {
                if (!uniqueSkills.includes(kw)) {
                  uniqueSkills.push(kw);
                }
              });
            });
          }
          
          if (req.unmatched) {
            req.unmatched.classes.forEach(label => {
              if (!uniqueSkills.includes(label)) {
                uniqueSkills.push(label);
              }
            });

            req.unmatched.keywords.forEach(kw => {
              if (!uniqueSkills.includes(kw)) {
                uniqueSkills.push(kw);
              }
            })
          }
        });
      }
      console.log(uniqueSkills);
      return uniqueSkills;
    },
    matchedSkills() {
      var matchedSkills = [];
      if (this.requirements) {
        this.requirements.forEach(req => {
          if (req.matched) {
            req.matched.forEach(match => {
              match.classes.forEach(label => {
                if (!matchedSkills.includes(label)) {
                  matchedSkills.push(label);
                }
              });
              
              match.keywords.forEach(kw => {
                if (!matchedSkills.includes(kw)) {
                  matchedSkills.push(kw);
                }
              });
            });
          }
        });
      }
      console.log(matchedSkills);
      return matchedSkills;
    },
    matchPercentage() {
      var matchPercentage = 0;
      if (this.uniqueSkills.length > 0) {
        return Math.round(this.matchedSkills.length / this.uniqueSkills.length * 100);
      }
      return matchPercentage;
    },

    doughnutChartStyles() {
      return {
        height: `180px`,
        position: 'relative'
      }
    }
  },
  methods: {
    async parseAndMatch() {
      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
      }

      this.requirements = null;
      this.loading = true;

      const jobTitle = encodeURIComponent(this.jobTitle);
      const requirements = encodeURIComponent(this.jd);
      const cv = encodeURIComponent(this.cv);
      const endpoint = '/match?job_title=' + jobTitle + '&requirements=' + requirements + '&cv=' + cv

      try {
        var response = await this.$axios.get(this.$apiBase + endpoint);
        this.requirements = response.data.data;
        console.log(this.requirements);
        if (!this.panel.includes(1)) {
          this.panel = [1];
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  
    validationErrors(test, name) {
        const errors = [];
        if (!test.$dirty) return errors;
        test.required === false && errors.push(name + ' is required.');
        return errors;
    }
  },
  
  validations: {
    jobTitle: { required },
    jd: { required },
    cv: { required }
  }
}
</script>

<style scoped lang="scss">
</style>