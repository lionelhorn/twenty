import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { PROFILING_REPORTER_DIV_ID } from '~/testing/profiling/constants/ProfilingReporterDivId';
import { currentProfilingRunIndexState } from '~/testing/profiling/states/currentProfilingRunIndexState';
import { profilingSessionDataPointsState } from '~/testing/profiling/states/profilingSessionDataPointsState';
import { profilingSessionStatusState } from '~/testing/profiling/states/profilingSessionStatusState';
import { computeProfilingReport } from '~/testing/profiling/utils/computeProfilingReport';

const StyledTable = styled.table`
  border: 1px solid black;

  th,
  td {
    border: 1px solid black;
  }

  td {
    padding: 5px;
  }
`;

export const ProfilingReporter = () => {
  const { t } = useTranslation();

  const [profilingSessionDataPoints] = useRecoilState(
    profilingSessionDataPointsState,
  );

  const [currentProfilingRunIndex] = useRecoilState(
    currentProfilingRunIndexState,
  );

  const [profilingSessionStatus] = useRecoilState(profilingSessionStatusState);

  const profilingReport = useMemo(
    () => computeProfilingReport(profilingSessionDataPoints),
    [profilingSessionDataPoints],
  );

  return (
    <div
      data-profiling-report={JSON.stringify(profilingReport)}
      id={PROFILING_REPORTER_DIV_ID}
    >
      <h2>{t('profilingReporter.profiling-report')}</h2>
      <div>
        {t('profilingReporter.run')}
        {currentProfilingRunIndex} {t('profilingReporter.status')}{' '}
        {profilingSessionStatus}
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>{t('profilingReporter.run-name')}</th>
            <th>{t('profilingReporter.min')}</th>
            <th>{t('profilingReporter.average')}</th>
            <th>{t('profilingReporter.p50')}</th>
            <th>{t('profilingReporter.p80')}</th>
            <th>{t('profilingReporter.p90')}</th>
            <th>{t('profilingReporter.p95')}</th>
            <th>{t('profilingReporter.p99')}</th>
            <th>{t('profilingReporter.max')}</th>
            <th>{t('profilingReporter.variance')}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ fontWeight: 'bold' }}>
            <td>{t('profilingReporter.total')}</td>
            <td>
              {Math.round(profilingReport.total.min * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.average * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.p50 * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.p80 * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.p90 * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.p95 * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.p99 * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.max * 1000) / 1000}
              {t('profilingReporter.ms')}
            </td>
            <td>
              {Math.round(profilingReport.total.variance * 1000000) / 1000000}
            </td>
          </tr>
          {Object.entries(profilingReport.runs).map(([runName, report]) => {
            return (
              <tr key={runName}>
                <td>{runName}</td>
                <td>
                  {Math.round(report.min * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.average * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.p50 * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.p80 * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.p90 * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.p95 * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.p99 * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>
                  {Math.round(report.max * 1000) / 1000}
                  {t('.ms')}
                </td>
                <td>{Math.round(report.variance * 1000000) / 1000000}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
};
